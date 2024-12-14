import fs from "fs";


export function createRepository() {
  return {
    async getHistory() {
      return new Promise((resolve, reject) => {
        const files = fs.readdirSync("data/volume-conversions-day");
        if (!files) {
          reject();
          return;
        }
        resolve(files);
      });
    },

    async getHistoryByDate(date: string) {
      return new Promise((resolve, reject) => {
        const files = fs.readdirSync("data/volume-conversions-day");
        const file = files.find((file) => file === `${date}.json`);
        if (!file) {
          reject();
          return;
        }
        resolve(file);
      });
    },
  };
}
