import { getServerServices } from "$lib/server/services";

import { fail, redirect } from "@sveltejs/kit";

import type { Actions } from "./$types";

export const actions: Actions = {
  "create-boardset": async ({ request, platform, cookies }) => {
    const { Users, UserBoardsets } = getServerServices(platform);

    const username = await Users().whoAmI(cookies);

    if (!username) {
      return fail(401);
    }

    const userBoardsets = UserBoardsets(username);

    const formData = await request.formData();
    const boardsetName = formData.get("boardsetName")?.toString();

    if (!boardsetName) {
      return fail(400);
    }

    const result = await userBoardsets.createBoardset({ name: boardsetName });

    if (!result) {
      return fail(400);
    }

    throw redirect(302, "/boardsets/" + Object.keys(result)[0]);
  },

  "delete-boardset": async ({ request, platform, cookies }) => {
    const { Users, UserBoardsets } = getServerServices(platform);

    const username = await Users().whoAmI(cookies);

    if (!username) {
      return fail(401);
    }

    const userBoardsets = UserBoardsets(username);

    const formData = await request.formData();
    const boardsetId = formData.get("boardsetId")?.toString();

    if (!boardsetId) {
      return fail(400);
    }

    await userBoardsets.deleteBoardset({ boardsetId });

    throw redirect(302, "/boardsets");
  },
};
