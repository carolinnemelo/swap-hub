import { createService } from "./service";

export const volumeFeature = createService() {
  
}


export function createPancakesFeature(
  getLayersByMenuItemName: GetLayersByMenuItemName
) {
  const db = createDb();
  const service = createService(db, getLayersByMenuItemName);
  const router = createRouter(service);

  return {
    service,
    router,
  };
}
