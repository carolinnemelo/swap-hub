import { createVolumeRouter } from "./router";
import { createService } from "./service";

export function createTemperatureFeature() {
  const service = createService();
  const router = createVolumeRouter(service);

  return {
    service,
    router,
  };
}
