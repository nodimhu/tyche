import { getServerServices } from "$lib/server/services";
import jwt from "@tsndr/cloudflare-worker-jwt";

import { fail, redirect } from "@sveltejs/kit";

import type { Actions } from "./$types";

export const actions: Actions = {
  login: async ({ request, platform, cookies }) => {
    const { env, Users } = getServerServices(platform);
    const appSigningSecret = env.require("APP_SIGNING_SECRET");

    const createJwt = async (username: string): Promise<void> => {
      const token = await jwt.sign(
        {
          sub: username,
          exp: Math.round(new Date().getTime() / 1000 + 86400),
        },
        appSigningSecret,
      );

      cookies.set("tyche-user", token, { maxAge: 86400, secure: true });
    };

    const formData = await request.formData();

    const username = (formData.get("username") ?? "").toString();
    const password = (formData.get("password") ?? "").toString();

    if (!username || !password) {
      return fail(400, {
        username,
        usernameMissing: !username,
        passwordMissing: !password,
      });
    }

    const isValidLogin = await Users().verifyUserPassword({ username, password });

    if (isValidLogin) {
      await createJwt(username);
      throw redirect(302, "/");
    }

    return fail(400, { username, unauthorized: true });
  },
};
