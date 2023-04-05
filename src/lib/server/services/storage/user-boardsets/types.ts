import type {
  CreateBoardsetParams,
  DeleteBoardsetParams,
  GetBoardsetParams,
  UpdateBoardsetParams,
} from "$lib/server/models/objects/user-boardsets/params";
import type {
  CreateBoardsetResult,
  GetBoardsetResult,
  GetBoardsetsResult,
  UpdateBoardsetResult,
} from "$lib/server/models/objects/user-boardsets/results";

export interface UserBoardsetsStorage {
  getBoardsets(): Promise<GetBoardsetsResult>;
  getBoardset(params: GetBoardsetParams): Promise<GetBoardsetResult | null>;
  createBoardset(params: CreateBoardsetParams): Promise<CreateBoardsetResult>;
  updateBoardset(params: UpdateBoardsetParams): Promise<UpdateBoardsetResult>;
  deleteBoardset(params: DeleteBoardsetParams): Promise<void>;
  deleteAllBoardsets(): Promise<void>;
}
