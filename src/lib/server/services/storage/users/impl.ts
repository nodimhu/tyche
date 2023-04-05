import { USER_TOKEN_COOKIE_NAME } from "$lib/config/common";
import type { Cookies } from "@sveltejs/kit";
import jwt from "@tsndr/cloudflare-worker-jwt";

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

  async createToken(username: string, cookies: Cookies): Promise<void> {
    const appSigningSecret = this.env.require("APP_SIGNING_SECRET");

    const userToken = await jwt.sign(
      {
        sub: username,
        exp: Math.round(new Date().getTime() / 1000 + 86400),
      },
      appSigningSecret,
    );

    cookies.set(USER_TOKEN_COOKIE_NAME, userToken, {
      maxAge: 86400,
      secure: true,
    });
  }

  async verifyToken(cookies: Cookies): Promise<boolean> {
    const userToken = cookies.get(USER_TOKEN_COOKIE_NAME);
    const appSigningSecret = this.env.require("APP_SIGNING_SECRET");

    return (
      !!userToken &&
      (await jwt.verify(userToken, appSigningSecret)) &&
      !!jwt.decode(userToken).payload.sub
    );
  }

  async renewToken(cookies: Cookies): Promise<void> {
    const userToken = cookies.get(USER_TOKEN_COOKIE_NAME);
    const userTokenSubject = userToken && jwt.decode(userToken).payload.sub;

    if (!this.verifyToken(cookies) || !userToken || !userTokenSubject) {
      throw new Error("Cannot renew invalid user token.");
    }

    const appSigningSecret = this.env.require("APP_SIGNING_SECRET");

    const newToken = await jwt.sign(
      {
        sub: userTokenSubject,
        exp: Math.round(Date.now() / 1000 + 86400),
      },
      appSigningSecret,
    );

    cookies.set(USER_TOKEN_COOKIE_NAME, newToken, { maxAge: 86400, secure: true });
  }

  async whoAmI(cookies: Cookies): Promise<string | null> {
    const userToken = cookies.get(USER_TOKEN_COOKIE_NAME);
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
