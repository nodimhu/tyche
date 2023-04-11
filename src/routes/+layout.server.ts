import { getServerServices } from "$lib/server/services";

import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ cookies, platform }) => {
  const { Users, UserBoardsets, UserSettings } = getServerServices(platform);
  const username = await Users().whoAmI(cookies);

  if (!username) {
    return {
      username: null,
      boardsets: null,
      settings: null,
    };
  }

  return {
    username,
    boardsets: await UserBoardsets(username).getBoardsets(),
    settings: await UserSettings(username).getSettigns(),
  };
};
