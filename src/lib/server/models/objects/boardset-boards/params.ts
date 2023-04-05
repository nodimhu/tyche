export type GetBoardsParams = {
  year?: number;
};

export type GetBoardParams = {
  boardId: string;
};

export type CreateBoardParams = {
  year: number;
  month: number;
};

export type DeleteBoardParams = GetBoardParams;
