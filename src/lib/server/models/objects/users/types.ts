import type { HashData } from "../../common/types";

export type User = {
  displayName: string;
  email: string;
  passwordHashData: HashData;
};

export type UsersData = {
  [username: string]: User;
};
