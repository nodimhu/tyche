import { writable } from "svelte/store";

export const DEFAULT_BOARD_STORE_DATA = {
  accounts: {},
  transactions: {},
  parameters: { savingsGoalPercentage: 0 },
};

export const boardStore = writable<TycheDO.Board.BoardData>(DEFAULT_BOARD_STORE_DATA);
