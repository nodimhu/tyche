import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async ({ params, parent, data: serverData }) => {
  const parentData = await parent();

  if (!parentData.boardsets) {
    return { ...serverData };
  }

  const boardsetId = params.boardsetId;

  return {
    ...serverData,
    boardset: parentData.boardsets[boardsetId] ?? null,
    boardsetIdParam: boardsetId,
  };
};
