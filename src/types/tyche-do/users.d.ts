declare global {
  namespace TycheDO {
    namespace Users {
      // --- DATA ---

      type User = {
        displayName: string;
        email: string;
        passwordHashData: HashData;
      };
      type UsersData = {
        [username: string]: User;
      };

      // --- PARAMS ---

      type GetUserParams = {
        username: string;
      };
      type CreateUserParams = Partial<Omit<User, "passwordHashData">> & {
        username: string;
        password: string;
        email: string;
      };
      type UpdateUserParams = {
        username: string;
        user: Partial<Omit<User, "passwordHashData">> & {
          password?: string;
        };
      };
      type DeleteUserParams = GetUserParams;
      type VerifyUserPasswordParams = {
        username: string;
        password: string;
      };

      // --- RESULTS ---

      type GetUserResult = Omit<User, "passwordHashData">;
      type CreateUserResult = GetUserResult;
      type UpdateUserResult = GetUserResult;
    }
  }
}

export {};
