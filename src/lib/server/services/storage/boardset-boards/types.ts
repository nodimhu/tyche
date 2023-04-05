import type {
  CreateBoardParams,
  DeleteBoardParams,
  GetBoardParams,
  GetBoardsParams,
} from "$lib/server/models/objects/boardset-boards/params";
import type {
  CreateBoardResult,
  GetBoardsResult,
} from "$lib/server/models/objects/boardset-boards/results";

export interface BoardsetBoardsStorage {
  getBoards(params: GetBoardsParams): Promise<GetBoardsResult>;
  getBoard(params: GetBoardParams): Promise<GetBoardsResult | null>;
  createBoard(params: CreateBoardParams): Promise<CreateBoardResult>;
  deleteBoard(params: DeleteBoardParams): Promise<void>;
  deleteAllBoards(): Promise<void>;
}
