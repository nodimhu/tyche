declare global {
  namespace TycheDO {
    namespace BoardsetBoards {
      // --- DATA ---

      type BoardData = {
        month: number;
      };
      type BoardsetBoardsData = {
        boards: {
          [year: string]: {
            [boardId: string]: BoardData;
          };
        };
      };

      // --- PARAMS ---

      type GetBoardsParams = {
        year?: number;
      };
      type GetBoardParams = {
        boardId: string;
      };
      type CreateBoardParams = {
        year: number;
        month: number;
      };
      type CopyBoardParams = CreateBoardParams & {
        boardId: string;
      };
      type DeleteBoardParams = GetBoardParams;

      // --- RESULTS ---

      type GetBoardsResult = BoardsetBoardsData["boards"];
      type CreateBoardResult = GetBoardsResult;
      type CopyBoardResult = GetBoardsResult;
    }
  }
}

export {};
