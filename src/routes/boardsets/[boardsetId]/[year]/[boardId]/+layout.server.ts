import { getServerServices } from "$lib/server/services/server-services";

import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ cookies, platform, params }) => {
  const { Users, BoardsetBoards, Board } = getServerServices(platform);

  const username = await Users().whoAmI(cookies);

  if (!username) {
    return {
      board: null,
    };
  }

  const boards = BoardsetBoards(username, params.boardsetId);
  const boardData = await boards.getBoard({ boardId: params.boardId });

  if (!boardData || !(params.year in boardData)) {
    return {
      board: null,
    };
  }

  const board = Board(username, params.boardsetId, params.boardId);

  return {
    board: {
      accounts: await board.getAccounts(),
      transactions: await board.getTransactions(),
      parameters: await board.getParameters(),
    },
  };
};
