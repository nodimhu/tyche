import type { UpdateUserSettingsParams } from "../../../models/objects/user-settings/params";
import type {
  GetUserSettingsResult,
  UpdateUserSettingsResult,
} from "../../../models/objects/user-settings/results";

export interface UserSettingsStorage {
  getSettigns(): Promise<GetUserSettingsResult | null>;
  updateSettings(params: UpdateUserSettingsParams): Promise<UpdateUserSettingsResult>;
}
