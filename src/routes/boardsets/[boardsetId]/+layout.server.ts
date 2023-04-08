import { getServerServices } from "$lib/server/services";

import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ cookies, platform, params }) => {
  const { Users, BoardsetBoards } = getServerServices(platform);

  const username = await Users().whoAmI(cookies);

  if (!username) {
    return { boards: null };
  }

  const boards = await BoardsetBoards(username, params.boardsetId).getBoards({});

  if (Object.keys(boards).length === 0) {
    return { boards: null };
  }

  return { boards };
};
