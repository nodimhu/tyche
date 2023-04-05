import type { Boardset, BoardsetsData } from "./types";

export type GetBoardsetsResult = BoardsetsData;

export type GetBoardsetResult = Boardset;

export type CreateBoardsetResult = Partial<BoardsetsData>;

export type UpdateBoardsetResult = GetBoardsetResult;
