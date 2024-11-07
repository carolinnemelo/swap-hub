
import { VolumeSchemaObject } from "./types";

export type Db = {
  viewAll: () => Promise<VolumeSchemaObject[]>
  convert: (conversion: VolumeSchemaObject) => Promise<void>;
};

export function createDb(): Db {
  const data: VolumeSchemaObject[] = [];

  return {
    viewAll: async () => data,
    convert: async (conversion: VolumeSchemaObject) => {
      data.push(conversion);
    },
  };
}

