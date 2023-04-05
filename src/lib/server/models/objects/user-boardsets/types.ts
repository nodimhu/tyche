export type Boardset = {
  name: string;
  currency?: string;
};

export type BoardsetsData = {
  [boardsetId: string]: Boardset;
};
