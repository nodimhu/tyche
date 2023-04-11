import { getEventContext } from "$lib/server/services";

import { error, json } from "@sveltejs/kit";

import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async (requestEvent) => {
  const {
    username,
    serverServices,
    params: { boardsetId, boardId },
    json: { name, opening, closing },
  } = await getEventContext(requestEvent, {
    requiredJsonParams: ["name"] as const,
  });

  const { Board } = serverServices;
  const board = Board(username, boardsetId, boardId);

  if (!name || typeof name !== "string") {
    throw error(400);
  }

  if (
    !name ||
    typeof name !== "string" ||
    (opening !== undefined && typeof opening !== "number") ||
    (closing !== undefined && typeof closing !== "number")
  ) {
    throw error(400);
  }

  const newAccount = await board.createAccount({ name, opening, closing });

  return json(newAccount);
};

export const PUT: RequestHandler = async (requestEvent) => {
  const {
    username,
    serverServices,
    params: { boardsetId, boardId },
    searchParams: { accountId },
    json: { name, opening, closing },
  } = await getEventContext(requestEvent, {
    requiredSearchParams: ["accountId"] as const,
  });

  const { Board } = serverServices;
  const board = Board(username, boardsetId, boardId);

  if (
    (name !== undefined && (!name || typeof name !== "string")) ||
    (opening !== undefined && typeof opening !== "number") ||
    (closing !== undefined && typeof closing !== "number")
  ) {
    throw error(400);
  }

  const updatedAccount = await board.updateAccount({
    accountId,
    account: {
      name,
      opening,
      closing,
    },
  });

  return json(updatedAccount);
};

export const DELETE: RequestHandler = async (requestEvent) => {
  const {
    username,
    serverServices,
    params: { boardsetId, boardId },
    searchParams: { accountId },
  } = await getEventContext(requestEvent, {
    requiredSearchParams: ["accountId"] as const,
    noJson: true,
  });

  const { Board } = serverServices;
  const board = Board(username, boardsetId, boardId);

  await board.deleteAccount({ accountId });

  return new Response(null, { status: 204 });
};
