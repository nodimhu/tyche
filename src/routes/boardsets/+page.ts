import { redirect } from "@sveltejs/kit";

import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ parent }) => {
  const parentData = await parent();

  if (parentData.boardsets) {
    const firstBoardsetId = Object.keys(parentData.boardsets)[0];

    if (firstBoardsetId) {
      throw redirect(302, `/boardsets/${firstBoardsetId}`);
    }
  }
};
