import fs from "fs";


export function createRepository() {
  return {
    async getHistory(filePath: string) {
      return new Promise((resolve, reject) => {
        fs.readFile(filePath, "utf-8", (error, data) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(data);
        });
      });
    }

  }
}
