import { redirect } from "@sveltejs/kit";

import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ parent }) => {
  const parentData = await parent();

  if (parentData.boards) {
    const latestYearInBoardset = Math.max(
      ...Object.keys(parentData.boards).map((year) => Number(year)),
    );

    if (parentData.boardsetIdParam && latestYearInBoardset) {
      throw redirect(
        302,
        `/boardsets/${parentData.boardsetIdParam}/${latestYearInBoardset}`,
      );
    }
  }
};
