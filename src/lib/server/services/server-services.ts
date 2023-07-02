import { Env } from "./env";
import { BoardStorage } from "./storage/tyche-do/board";
import { BoardsetBoardsStorage } from "./storage/tyche-do/boardset-boards";
import { UserBoardsetsStorage } from "./storage/tyche-do/user-boardsets";
import { UserSettingsStorage } from "./storage/tyche-do/user-settings";
import { UsersStorage } from "./storage/tyche-do/users";

export class ServerServices {
  readonly env: Env;
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
    this.env = new Env(platform);

    this.Users = () => new UsersStorage(this.env);
    this.UserSettings = (username: string) =>
      new UserSettingsStorage(this.env, new UsersStorage(this.env), username);
    this.UserBoardsets = (username: string) =>
      new UserBoardsetsStorage(this.env, new UsersStorage(this.env), username);
    this.BoardsetBoards = (username: string, boardsetId: string) =>
      new BoardsetBoardsStorage(this.env, this.UserBoardsets(username), boardsetId);
    this.Board = (username: string, boardsetId: string, boardId: string) =>
      new BoardStorage(this.env, this.BoardsetBoards(username, boardsetId), boardId);
  }
}

let SERVER_SERVICES: ServerServices | null = null;

export function getServerServices(platform: App.Platform | undefined): ServerServices {
  if (SERVER_SERVICES === null) {
    SERVER_SERVICES = new ServerServices(platform);
  }
  return SERVER_SERVICES;
}
