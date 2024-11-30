import { v4 } from "uuid";
import fs from "fs";
import { volumeErrors } from "../error-messages";
import { normalizeUnit, parseValue } from "./logic";

export function create() {
  return {
    async viewAll() {
      return db.viewAll(); // nao tenho db
    },

    async getVolumeUnits() {
      try {
        const filePath = "./data/volume.json";
        const data = readJsonContent(filePath);
        return data[0].volumeUnits;
      } catch {
        throw new Error(volumeErrors.fileReadError);
      }
    },

    async parseVolumeInputs(req, volumeUnits) {
      let { fromUnit, toUnit, value } = req;
      try {
        fromUnit = normalizeUnit(fromUnit, volumeUnits);
        toUnit = normalizeUnit(toUnit, volumeUnits);
        value = parseValue(value);
        return { fromUnit, toUnit, value };
      } catch (error) {
        return error.message;
      }
    },

    async readJsonContent(filePath: string) {
      fs.readFile(filePath, "utf-8", (error, data) => {
        if (error) {
          console.log(error);
          res.status(401).send("error reading the file" + error);
        }
        const volumeUnits = JSON.parse(data)[0].volumeUnits;
        return 
    },
  },

    async generateId() {
      return v4();
    },

    async saveConversion({ fromUnit, toUnit, value, convertedValue }) {
      const id = this.generateId();
      const { filePath, time } = this.createConversionFilePerDay(); //colocar a funcao no novo file
      const conversion = {
        id,
        time,
        fromUnit,
        value,
        toUnit,
        convertedValue,
      };
      const fileContent = this.readJsonContent(filePath); // usar a funcao readJsonContent(fileName)
      const currentConversions = JSON.parse(fileContent);
      currentConversions.push(conversion);
      fs.writeFileSync(filePath, JSON.stringify(currentConversions, null, 2)); // writeJsonContent(file)
    },

    createConversionFilePerDay() {
      //move pro novo arquivo
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
      return { filePath, time };
    },
  };
};



// Express weekend project feedback:
// function StartApp() isn’t needed. But it doesn’t really hurt. Just unnecessary.
// / route could list the other available endpoints to provide a bit of value.
// The first test where you check if Supertest itself is working is usually replaced with a real test. A better name for the test for the code you have is “App works”.
// Don’t validate max length unless it really helps.
// If you install eslint, you will get errors when you have unused imports.
// Use res.json instead of res.send for sending JSON. It’s safer.
// if(file) … should be if(!file) return res.status(400).json(…);
// In-memory mock database would have been better choice from a learning perspective. I want to see that you wrap the database in a factory with methods that hide away the database details. Also, in the future, check out sqlite! It’s pretty handy for cases where a simple file is enough.
// Clear expectations in the planning, nice!
// I missed the big picture plan though.
// You seemed a bit disorganized in the presentation compared to how organized you usually are.
// For me to approve the project, I’m going to require that you wrap your file system code in a factory function that hides the implementation away. Send me the code once it’s done, please.