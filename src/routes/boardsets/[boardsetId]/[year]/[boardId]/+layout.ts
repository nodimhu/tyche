import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async ({ params, data: serverData }) => {
  return {
    ...serverData,
    boardIdParam: params.boardId,
  };
};
