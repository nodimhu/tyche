import type { User } from "./types";

export type GetUserResult = Omit<User, "passwordHashData">;

export type CreateUserResult = GetUserResult;

export type UpdateUserResult = GetUserResult;
