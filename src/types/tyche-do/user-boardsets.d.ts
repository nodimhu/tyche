declare global {
  namespace TycheDO {
    namespace UserBoardsets {
      // --- DATA ---

      type Boardset = {
        name: string;
        currency?: string;
      };
      type BoardsetsData = {
        [boardsetId: string]: Boardset;
      };

      // --- PARAMS ---

      type GetBoardsetParams = {
        boardsetId: string;
      };
      type CreateBoardsetParams = Partial<Boardset> & {
        name: string;
      };
      type UpdateBoardsetParams = {
        boardsetId: string;
        boardset: Partial<Boardset>;
      };
      type DeleteBoardsetParams = GetBoardsetParams;

      // --- RESULTS ---

      type GetBoardsetsResult = BoardsetsData;
      type GetBoardsetResult = Boardset;
      type CreateBoardsetResult = Partial<BoardsetsData>;
      type UpdateBoardsetResult = GetBoardsetResult;
    }
  }
}

export {};
