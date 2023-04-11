import { getEventContext } from "$lib/server/services";

import { error, json } from "@sveltejs/kit";

import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async (context) => {
  const {
    username,
    serverServices,
    params: { boardsetId, boardId },
    json: { description, type, cadence, amount },
  } = await getEventContext(context, {
    requiredJsonParams: ["type", "description"] as const,
  });

  const { Board } = serverServices;
  const board = Board(username, boardsetId, boardId);

  if (
    !description ||
    typeof description !== "string" ||
    (type !== "income" && type !== "expense") ||
    (cadence !== undefined && cadence !== "recurring" && cadence !== "occasional") ||
    (amount !== undefined && typeof amount !== "number")
  ) {
    throw error(400);
  }

  const newTransaction = await board.createTransaction({
    type,
    description,
    cadence,
    amount,
  });

  return json(newTransaction);
};

export const PUT: RequestHandler = async (context) => {
  const {
    username,
    serverServices,
    params: { boardsetId, boardId },
    searchParams: { transactionId },
    json: { description, type, cadence, amount },
  } = await getEventContext(context, {
    requiredSearchParams: ["transactionId"] as const,
  });

  const { Board } = serverServices;
  const board = Board(username, boardsetId, boardId);

  if (
    (type !== undefined && type !== "income" && type !== "expense") ||
    (description !== undefined && (!description || typeof description !== "string")) ||
    (cadence !== undefined && cadence !== "recurring" && cadence !== "occasional") ||
    (amount !== undefined && typeof amount !== "number")
  ) {
    throw error(400);
  }

  const updatedAccount = await board.updateTransaction({
    transactionId,
    transaction: {
      type,
      description,
      cadence,
      amount,
    },
  });

  return json(updatedAccount);
};

export const DELETE: RequestHandler = async (context) => {
  const {
    username,
    serverServices,
    params: { boardsetId, boardId },
    searchParams: { transactionId },
  } = await getEventContext(context, {
    requiredSearchParams: ["transactionId"] as const,
    noJson: true,
  });

  const { Board } = serverServices;
  const board = Board(username, boardsetId, boardId);

  await board.deleteTransaction({ transactionId });

  return new Response(null, { status: 204 });
};
