import { Pancake } from ".";

export type Db = {
  viewAll: () => Promise<Pancake[]>;
  cook: (pancake: Pancake) => Promise<void>;
};

export function createDb(): Db {
  const data: Pancake[] = [];

  return {
    viewAll: async () => data,
    convert: async (pancake: Pancake) => {
      data.push(pancake);
    },
  };
}
