import type { Boardset } from "./types";

export type GetBoardsetParams = {
  boardsetId: string;
};

export type CreateBoardsetParams = {
  name: string;
} & Partial<Boardset>;

export type UpdateBoardsetParams = {
  boardsetId: string;
  boardset: Partial<Boardset>;
};

export type DeleteBoardsetParams = GetBoardsetParams;
