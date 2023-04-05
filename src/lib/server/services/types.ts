import type { Env } from "./env";
import type { ErrorLogger } from "./error-logger";
import type { BoardStorage } from "./storage/board";
import type { BoardsetBoardsStorage } from "./storage/boardset-boards";
import type { UserBoardsetsStorage } from "./storage/user-boardsets";
import type { UserSettingsStorage } from "./storage/user-settings";
import type { UsersStorage } from "./storage/users/types";

export interface ServerServices {
  readonly env: Env;
  readonly errorLogger: ErrorLogger;
  readonly Users: () => UsersStorage;
  readonly UserSettings: (username: string) => UserSettingsStorage;
  readonly UserBoardsets: (username: string) => UserBoardsetsStorage;
  readonly BoardsetBoards: (
    username: string,
    boardsetId: string,
  ) => BoardsetBoardsStorage;
  readonly Board: (
    username: string,
    boardsetId: string,
    boardId: string,
  ) => BoardStorage;
}
