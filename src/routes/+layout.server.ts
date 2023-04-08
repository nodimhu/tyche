import { getServerServices } from "$lib/server/services";

import type { LayoutServerLoad } from "./$types";

// TODO: Redo bootstrap's JS in Svelte and only use bootstrap's CSS, then revisit
// enabling SSR.
// export const ssr = false;

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
