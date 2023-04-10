import { TYCHE_USER_JWT_COOKIE_NAME } from "$lib/config/common";
import jwt from "@tsndr/cloudflare-worker-jwt";

import type { Cookies } from "@sveltejs/kit";

import type {
  CreateUserParams,
  GetUserParams,
  UpdateUserParams,
  VerifyUserPasswordParams,
} from "../../../models/objects/users/params";
import type {
  CreateUserResult,
  GetUserResult,
} from "../../../models/objects/users/results";
import type { Env } from "../../env";
import { BaseDoOrFetchStorage } from "../base";
import { StorageOperationError } from "../errors";

import type { UsersStorage } from "./types";

export class UsersDoOrFetchStorage
  extends BaseDoOrFetchStorage
  implements UsersStorage
{
  constructor(private readonly env: Env) {
    super("root", env.get("USERS"), env.get("USERS_DEV_URL"));
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

  async getUser(params: GetUserParams): Promise<GetUserResult | null> {
    return await this.operationRequest("getUser", params);
  }

  async createUser(params: CreateUserParams): Promise<CreateUserResult> {
    return await this.operationRequest("createUser", params);
  }

  async updateUser(params: UpdateUserParams): Promise<GetUserResult> {
    const user = await this.operationRequest<UpdateUserParams, GetUserResult>(
      "updateUser",
      params,
    );

    if (!user) {
      throw new StorageOperationError();
    }

    return user;
  }

  async deleteUser(params: GetUserParams): Promise<void> {
    await this.operationRequest("deleteUser", params);
  }

  async verifyUserPassword(params: VerifyUserPasswordParams): Promise<boolean> {
    try {
      await this.operationRequest("verifyUserPassword", params);
    } catch (error) {
      if (error instanceof StorageOperationError) {
        return false;
      }
    }
    return true;
  }
}
