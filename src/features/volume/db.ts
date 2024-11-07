import { Pancake } from ".";
import { VolumeSchemaObject } from "./types";

export type Db = {
  viewAll: () => Promise<Pancake[]>;
  convert: (conversion: VolumeSchemaObject) => Promise<void>;
};

export function createDb(): Db {
  const data = [];

  return {
    viewAll: async () => data,
    convert: async (conversion: VolumeSchemaObject) => {
      data.push(conversion);
    },
  };
}

