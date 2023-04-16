import { getServerServices } from "$lib/server/services";

import { fail, redirect } from "@sveltejs/kit";

import type { Actions } from "./$types";

export const actions: Actions = {
  "create-board": async ({ request, platform, cookies }) => {
    const { Users, BoardsetBoards } = getServerServices(platform);

    const username = await Users().whoAmI(cookies);

    if (!username) {
      return fail(401);
    }

    const formData = await request.formData();
    const boardsetId = formData.get("boardsetId")?.toString();
    const year = Number(formData.get("year"));
    const month = Number(formData.get("month"));

    if (!boardsetId || !year || !month) {
      return fail(400);
    }

    const boards = BoardsetBoards(username, boardsetId);

    const result = await boards.createBoard({ year, month });

    if (!result) {
      return fail(400);
    }

    for (const [boardId, boardData] of Object.entries(result[year.toString()])) {
      if (boardData.month === month) {
        throw redirect(302, `/boardsets/${boardsetId}/${year}/${boardId}`);
      }
    }

    throw redirect(302, `/boardsets/${boardsetId}/${year}`);
  },

  "copy-board": async ({ request, platform, cookies }) => {
    const { Users, BoardsetBoards } = getServerServices(platform);

    const username = await Users().whoAmI(cookies);

    if (!username) {
      return fail(401);
    }

    const formData = await request.formData();
    const boardsetId = formData.get("boardsetId")?.toString();
    const boardId = formData.get("boardId")?.toString();
    const year = Number(formData.get("year"));
    const month = Number(formData.get("month"));

    if (!boardsetId || !boardId || !year || !month) {
      return fail(400);
    }

    const boards = BoardsetBoards(username, boardsetId);

    const result = await boards.copyBoard({ boardId, year, month });

    if (!result) {
      return fail(400);
    }

    for (const [boardId, boardData] of Object.entries(result[year.toString()])) {
      if (boardData.month === month) {
        throw redirect(302, `/boardsets/${boardsetId}/${year}/${boardId}`);
      }
    }

    throw redirect(302, `/boardsets/${boardsetId}/${year}`);
  },

  "delete-board": async ({ request, platform, cookies }) => {
    const { Users, BoardsetBoards } = getServerServices(platform);

    const username = await Users().whoAmI(cookies);

    if (!username) {
      return fail(401);
    }

    const formData = await request.formData();
    const boardsetId = formData.get("boardsetId")?.toString();
    const boardId = formData.get("boardId")?.toString();

    if (!boardsetId || !boardId) {
      return fail(400);
    }

    const boards = BoardsetBoards(username, boardsetId);

    await boards.deleteBoard({ boardId });

    throw redirect(302, `/boardsets/${boardsetId}`);
  },
};
