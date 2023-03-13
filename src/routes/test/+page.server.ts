import { getServerServices } from "$lib/server/services";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ request, platform }) => {
  const { tycheStorage } = getServerServices(platform);

  const tycheDOData = await tycheStorage.get(request.url);

  return {
    tycheDOData,
  };
};
