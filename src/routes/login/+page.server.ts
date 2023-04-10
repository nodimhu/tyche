import { getServerServices } from "$lib/server/services";

import { fail, redirect } from "@sveltejs/kit";

import type { Actions } from "./$types";

export const actions: Actions = {
  default: async ({ request, platform, cookies }) => {
    const { Users } = getServerServices(platform);

    const formData = await request.formData();

    const username = (formData.get("username") ?? "").toString();
    const password = (formData.get("password") ?? "").toString();

    if (!username || !password) {
      return fail(400, {
        username,
        unauthorized: true,
      });
    }

    const isValidLogin = await Users().verifyUserPassword({ username, password });

    if (isValidLogin) {
      await Users().createJwtCookie(username, cookies);
      throw redirect(302, "/");
    }

    return fail(401, { username, unauthorized: true });
  },
};
