import { USER_TOKEN_COOKIE_NAME } from "$lib/config/common";

import { redirect } from "@sveltejs/kit";

import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ cookies }) => {
  cookies.delete(USER_TOKEN_COOKIE_NAME);
  throw redirect(302, "/login");
};
