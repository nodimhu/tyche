import type {
  CopyBoardParams,
  CreateBoardParams,
  DeleteBoardParams,
  GetBoardParams,
  GetBoardsParams,
} from "$lib/server/models/objects/boardset-boards/params";
import type {
  CopyBoardResult,
  CreateBoardResult,
  GetBoardsResult,
} from "$lib/server/models/objects/boardset-boards/results";

export interface BoardsetBoardsStorage {
  getBoards(params: GetBoardsParams): Promise<GetBoardsResult>;
  getBoard(params: GetBoardParams): Promise<GetBoardsResult | null>;
  createBoard(params: CreateBoardParams): Promise<CreateBoardResult>;
  copyBoard(params: CopyBoardParams): Promise<CopyBoardResult>;
  deleteBoard(params: DeleteBoardParams): Promise<void>;
  deleteAllBoards(): Promise<void>;
}
