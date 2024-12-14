import { createRepository } from "./repository";
import { createVolumeRouter } from "./router";
import { createService } from "./service";

export function createVolumeFeature() {
  const repository = createRepository();
  const service = createService(repository);
  const router = createVolumeRouter(service);

  return {
    service,
    router,
  };
}
