import { TYCHE_USER_JWT_COOKIE_NAME } from "$lib/config/common";

import { redirect } from "@sveltejs/kit";

import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies }) => {
  cookies.delete(TYCHE_USER_JWT_COOKIE_NAME);
  throw redirect(307, "/login");
};
