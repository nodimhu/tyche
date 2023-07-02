import { TYCHE_USER_JWT_COOKIE_NAME } from "$lib/config/common";
import jwt from "@tsndr/cloudflare-worker-jwt";

import type { Cookies } from "@sveltejs/kit";

import type { Env } from "../../env";
import { StorageOperationError } from "../errors";

import { BaseTycheDOBindingOrFetchStorage } from "./_base";

export class UsersStorage extends BaseTycheDOBindingOrFetchStorage {
  constructor(private readonly env: Env) {
    super("root", env.get("USERS"), env.get("USERS_DEV_URL"));
  }

  private async checkUserExists(username: string): Promise<void> {
    if (!(await this.getUser({ username }))) {
      throw new StorageOperationError("User does not exist.");
    }
  }

  async createJwtCookie(username: string, cookies: Cookies): Promise<void> {
    const appSigningSecret = this.env.require("APP_SIGNING_SECRET");

    const userJwt = await jwt.sign(
      {
        sub: username,
        exp: Math.round(new Date().getTime() / 1000 + 86400),
      },
      appSigningSecret,
    );

    cookies.set(TYCHE_USER_JWT_COOKIE_NAME, userJwt, {
      maxAge: 86400,
      secure: true,
      httpOnly: false,
      path: "/",
      sameSite: "lax",
    });
  }

  async verifyJwt(token?: string | null): Promise<boolean> {
    const appSigningSecret = this.env.require("APP_SIGNING_SECRET");

    return (
      !!token &&
      (await jwt.verify(token, appSigningSecret)) &&
      !!jwt.decode(token).payload.sub
    );
  }

  async verifyJwtCookie(cookies: Cookies): Promise<boolean> {
    const userJwt = cookies.get(TYCHE_USER_JWT_COOKIE_NAME);

    return !!userJwt && (await this.verifyJwt(userJwt));
  }

  async renewJwtCookie(cookies: Cookies): Promise<void> {
    const userJwt = cookies.get(TYCHE_USER_JWT_COOKIE_NAME);
    const username = userJwt && jwt.decode(userJwt).payload.sub;

    if (!userJwt || !username || !(await this.verifyJwt(userJwt))) {
      throw new Error("Cannot renew invalid user token.");
    }

    await this.createJwtCookie(username, cookies);
  }

  async whoAmI(cookies: Cookies): Promise<string | null> {
    const userToken = cookies.get(TYCHE_USER_JWT_COOKIE_NAME);
    const userTokenSubject = userToken && jwt.decode(userToken).payload.sub;

    if (!userTokenSubject) {
      return null;
    }

    return userTokenSubject;
  }

  async getUser(
    params: TycheDO.Users.GetUserParams,
  ): Promise<TycheDO.Users.GetUserResult | null> {
    return await this.operationRequest("getUser", params);
  }

  async createUser(
    params: TycheDO.Users.CreateUserParams,
  ): Promise<TycheDO.Users.CreateUserResult> {
    return await this.operationRequest("createUser", params);
  }

  async updateUser(
    params: TycheDO.Users.UpdateUserParams,
  ): Promise<TycheDO.Users.UpdateUserResult> {
    await this.checkUserExists(params.username);

    const user = await this.operationRequest<
      TycheDO.Users.UpdateUserParams,
      TycheDO.Users.UpdateUserResult
    >("updateUser", params);

    if (!user) {
      throw new StorageOperationError();
    }

    return user;
  }

  async deleteUser(params: TycheDO.Users.GetUserParams): Promise<void> {
    await this.operationRequest("deleteUser", params);
  }

  async verifyUserPassword(
    params: TycheDO.Users.VerifyUserPasswordParams,
  ): Promise<boolean> {
    try {
      await this.checkUserExists(params.username);
      await this.operationRequest("verifyUserPassword", params);
    } catch (error) {
      if (error instanceof StorageOperationError) {
        return false;
      }
    }
    return true;
  }
}
