import type { BoardData } from "$lib/server/models/objects/board/types";

import { writable } from "svelte/store";

export const boardStore = writable<BoardData>({
  accounts: {},
  transactions: {},
  parameters: { savingsGoalPercentage: 0 },
});
