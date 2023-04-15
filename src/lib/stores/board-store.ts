import type { BoardData } from "$lib/server/models/objects/board/types";

import { writable } from "svelte/store";

export const DEFAULT_BOARD_STORE_DATA = {
  accounts: {},
  transactions: {},
  parameters: { savingsGoalPercentage: 0 },
};

export const boardStore = writable<BoardData>(DEFAULT_BOARD_STORE_DATA);
