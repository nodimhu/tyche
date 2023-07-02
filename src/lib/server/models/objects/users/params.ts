import type { User } from "./types";

type UserWithoutPassword = Omit<User, "passwordHashData">;

export type GetUserParams = {
  username: string;
};

export type CreateUserParams = {
  username: string;
  password: string;
  email: string;
} & Partial<UserWithoutPassword>;

export type UpdateUserParams = {
  username: string;
  user: {
    password?: string;
  } & Partial<UserWithoutPassword>;
};

export type DeleteUserParams = GetUserParams;

export type VerifyUserPasswordParams = {
  username: string;
  password: string;
};
