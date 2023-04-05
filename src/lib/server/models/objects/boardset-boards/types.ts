export type BoardData = {
  month: number;
};

export type BoardsetBoardsData = {
  boards: {
    [year: string]: {
      [boardId: string]: BoardData;
    };
  };
};
