import { getEventContext } from "$lib/server/services/event-context";

import { error, json } from "@sveltejs/kit";

import type { RequestHandler } from "./$types";

export const PUT: RequestHandler = async (context) => {
  const {
    username,
    serverServices,
    params: { boardsetId, boardId },
    json: { savingsGoalPercentage },
  } = await getEventContext(context);

  const { Board } = serverServices;
  const board = Board(username, boardsetId, boardId);

  if (
    savingsGoalPercentage !== undefined &&
    typeof savingsGoalPercentage !== "number"
  ) {
    throw error(400);
  }

  const updateParameters = await board.updateParameters({
    savingsGoalPercentage,
  });

  return json(updateParameters);
};
