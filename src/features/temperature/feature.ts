import { createTemperatureRouter } from "./router";
import { createService } from "./service";

export function createTemperatureFeature() {
  const service = createService();
  const router = createTemperatureRouter(service);

  return {
    service,
    router,
  };
}

