import { getServerServices } from "$lib/server/services/server-services";

import { fail } from "@sveltejs/kit";

import type { Actions } from "./$types";

export const actions: Actions = {
  default: async ({ request, platform, cookies }) => {
    const { Users, UserSettings } = getServerServices(platform);

    const username = await Users().whoAmI(cookies);

    if (!username) {
      return fail(401);
    }

    const formData = await request.formData();

    const locale = (formData.get("locale") ?? "").toString();
    const defaultCurrency = (formData.get("defaultCurrency") ?? "").toString();

    if (!locale || !defaultCurrency) {
      return fail(400);
    }

    await UserSettings(username).updateSettings({ locale, defaultCurrency });

    return { saved: true };
  },
};
