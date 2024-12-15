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
    async deleteHistoryByDate(date: string) {
      return new Promise((resolve, reject) => {
        const files = fs.readdirSync("data/volume-conversions-day");
        const file = files.find((file) => file === `${date}.json`);
        if (!file) {
          reject();
          return;
        }
        fs.unlinkSync(`data/volume-conversions-day/${file}`);
        resolve("deleted");
      });
    },

    async getVolumeUnits() {
      return new Promise((resolve, reject) => {
        fs.readFile(
          "src/features/volume/volume.json",
          "utf-8",
          (error, data) => {
            if (error) {
              reject(error);
              return;
            }
            const volumeUnits = JSON.parse(data)[0].volumeUnits;
            resolve(volumeUnits);
          },
        );
      });
    },

    async saveConversion({ filePath, conversion }) {
      const fileContent = await new Promise((resolve, reject) => {
        fs.readFile(
          "data/volume-conversions-day/2024-dec-01.json",
          "utf-8",
          (error, data) => {
            if (error) {
              reject(error);
              return;
            }
            resolve(data);
            return;
          },
        );
      });
      if (typeof fileContent !== "string") {
        return;
      }
      const currentConversions = JSON.parse(fileContent);
      currentConversions.push(conversion);
      fs.writeFileSync(filePath, JSON.stringify(currentConversions, null, 2));
      return;
    },

    createConversionFilePerDay() {
      return new Promise((resolve, reject) => {
        try {
          if (!fs.existsSync("data/volume-conversions-day")) {
            fs.mkdirSync("data/volume-conversions-day", { recursive: true });
          }
          const day = new Date().toString().toLowerCase();
          const dayArray = day.split(" ");
          const fileName = `${dayArray[3]}-${dayArray[1]}-${dayArray[2]}`;
          const time = dayArray[4];
          const filePath = `data/volume-conversions-day/${fileName}.json`;
          if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, "[]", "utf-8");
          }
          resolve({ filePath, time });
          return;
        } catch (error) {
          reject(error);
        }
      });
    },
  };
}
