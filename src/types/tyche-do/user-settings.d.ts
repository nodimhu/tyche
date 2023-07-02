declare global {
  namespace TycheDO {
    namespace UserSettings {
      // --- DATA ---

      type UserSettingsData = {
        locale: string;
        defaultCurrency: string;
      };

      // --- PARAMS ---

      type UpdateUserSettingsParams = Partial<UserSettingsData>;

      // --- RESULTS ---

      type GetUserSettingsResult = UserSettingsData;
      type UpdateUserSettingsResult = GetUserSettingsResult;
    }
  }
}

export {};
