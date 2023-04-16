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

  let boardsets = await UserBoardsets(username).getBoardsets();

  boardsets = Object.fromEntries(
    Object.entries(boardsets).sort(([_A, bA], [_B, bB]) => {
      return bA.name.localeCompare(bB.name);
    }),
  );

  return {
    username,
    boardsets,
    settings: await UserSettings(username).getSettigns(),
  };
};
