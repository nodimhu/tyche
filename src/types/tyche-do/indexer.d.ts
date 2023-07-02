declare global {
  namespace TycheDO {
    namespace Indexer {
      // --- DATA ---

      type IndexerData = {
        [itemName: string]: {
          counter: number;
        };
      };

      // --- PARAMS ---

      type CreateIndexedIdParams = {
        itemName: string;
      };

      // --- RESULTS ---

      type CreateIndexedIdResult = {
        itemId: string;
      };
    }
  }
}

export {};
