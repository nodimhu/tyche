import { getServerServices } from "$lib/server/services";

import { fail } from "@sveltejs/kit";

import type { Actions } from "./$types";

export const actions: Actions = {
  "create-account": async ({ request, platform, cookies }) => {
    const { Users, Board } = getServerServices(platform);

    const username = await Users().whoAmI(cookies);

    if (!username) {
      return fail(401);
    }

    const formData = await request.formData();
    const boardsetId = formData.get("boardsetId")?.toString();
    const boardId = formData.get("boardId")?.toString();
    const accountName = formData.get("accountName")?.toString();
    const accountOpening = formData.get("accountOpening");
    const accountClosing = formData.get("accountClosing");

    if (!boardsetId || !boardId) {
      return fail(400);
    }

    const board = Board(username, boardsetId, boardId);

    const result = await board.createAccount({
      name: accountName ?? "New Account",
      opening: accountOpening !== null ? Number(accountOpening) : undefined,
      closing: accountClosing !== null ? Number(accountClosing) : undefined,
    });

    return { created: Object.keys(result)[0] };
  },

  "update-account": async ({ request, platform, cookies }) => {
    const { Users, Board } = getServerServices(platform);

    const username = await Users().whoAmI(cookies);

    if (!username) {
      return fail(401);
    }

    const formData = await request.formData();
    const boardsetId = formData.get("boardsetId")?.toString();
    const boardId = formData.get("boardId")?.toString();
    const accountId = formData.get("accountId")?.toString();
    const accountName = formData.get("accountName")?.toString();
    const accountOpening = formData.get("accountOpening");
    const accountClosing = formData.get("accountClosing");

    if (
      !boardsetId ||
      !boardId ||
      !accountId ||
      (accountName !== null && !accountName)
    ) {
      return fail(400);
    }

    const board = Board(username, boardsetId, boardId);

    await board.updateAccount({
      accountId,
      account: {
        name: accountName,
        opening: accountOpening !== null ? Number(accountOpening) : undefined,
        closing: accountClosing !== null ? Number(accountClosing) : undefined,
      },
    });

    return { updated: accountId };
  },

  "delete-account": async ({ request, platform, cookies }) => {
    const { Users, Board } = getServerServices(platform);

    const username = await Users().whoAmI(cookies);

    if (!username) {
      return fail(401);
    }

    const formData = await request.formData();
    const boardsetId = formData.get("boardsetId")?.toString();
    const boardId = formData.get("boardId")?.toString();
    const accountId = formData.get("accountId")?.toString();

    if (!boardsetId || !boardId || !accountId) {
      return fail(400);
    }

    const board = Board(username, boardsetId, boardId);

    await board.deleteAccount({ accountId });

    return { deleted: accountId };
  },
};
