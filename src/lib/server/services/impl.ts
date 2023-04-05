import { type Env, PlatformOrProcessEnv } from "./env";
import { type ErrorLogger, SentryErrorLogger } from "./error-logger";
import type { BoardStorage } from "./storage/board";
import { BoardDoOrFetchStorage } from "./storage/board/impl";
import type { BoardsetBoardsStorage } from "./storage/boardset-boards";
import { BoardsetBoardsDoOrFetchStorage } from "./storage/boardset-boards/impl";
import {
  UserBoardsetsDoOrFetchStorage,
  type UserBoardsetsStorage,
} from "./storage/user-boardsets";
import {
  UserSettingsDoOrFetchStorage,
  type UserSettingsStorage,
} from "./storage/user-settings";
import { UsersDoOrFetchStorage, type UsersStorage } from "./storage/users";
import type { ServerServices } from "./types";

export class ServerServicesSingleton implements ServerServices {
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

  constructor(platform?: App.Platform) {
    this.env = new PlatformOrProcessEnv(platform);
    this.errorLogger = new SentryErrorLogger(this.env);

    this.Users = () => new UsersDoOrFetchStorage(this.env);
    this.UserSettings = (username: string) =>
      new UserSettingsDoOrFetchStorage(
        this.env,
        new UsersDoOrFetchStorage(this.env),
        username,
      );
    this.UserBoardsets = (username: string) =>
      new UserBoardsetsDoOrFetchStorage(
        this.env,
        new UsersDoOrFetchStorage(this.env),
        username,
      );
    this.BoardsetBoards = (username: string, boardsetId: string) =>
      new BoardsetBoardsDoOrFetchStorage(
        this.env,
        this.UserBoardsets(username),
        boardsetId,
      );
    this.Board = (username: string, boardsetId: string, boardId: string) =>
      new BoardDoOrFetchStorage(
        this.env,
        this.BoardsetBoards(username, boardsetId),
        boardId,
      );
  }
}
