import { redirect } from "@sveltejs/kit";

import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ parent, params }) => {
  const parentData = await parent();

  const latestBoardInYear = Object.entries(parentData.boards?.[params.year] ?? {})
    .sort(([_A, boardDataA], [_B, boardDataB]) => boardDataA.month - boardDataB.month)
    .reverse()[0];

  if (latestBoardInYear) {
    throw redirect(
      302,
      `/boardsets/${params.boardsetId}/${params.year}/${latestBoardInYear[0]}`,
    );
  }
};
