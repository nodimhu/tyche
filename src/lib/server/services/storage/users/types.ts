import type { Cookies } from "@sveltejs/kit";

import type {
  CreateUserParams,
  DeleteUserParams,
  GetUserParams,
  UpdateUserParams,
  VerifyUserPasswordParams,
} from "../../../models/objects/users/params";
import type {
  CreateUserResult,
  GetUserResult,
  UpdateUserResult,
} from "../../../models/objects/users/results";

export interface UsersStorage {
  createJwtCookie(username: string, cookies: Cookies): Promise<void>;
  verifyJwt(token?: string | null): Promise<boolean>;
  verifyJwtCookie(cookies: Cookies): Promise<boolean>;
  renewJwtCookie(cookies: Cookies): Promise<void>;
  whoAmI(cookies: Cookies): Promise<string | null>;
  getUser(params: GetUserParams): Promise<GetUserResult | null>;
  createUser(params: CreateUserParams): Promise<CreateUserResult>;
  updateUser(params: UpdateUserParams): Promise<UpdateUserResult>;
  deleteUser(params: DeleteUserParams): Promise<void>;
  verifyUserPassword(params: VerifyUserPasswordParams): Promise<boolean>;
}
