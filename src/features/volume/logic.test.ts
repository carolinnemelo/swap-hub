import test from "node:test";
import assert from "node:assert";
import { convertVolume } from "./logic";
import { volumeErrors } from "../error-messages";

test.only("When one of the arguments isn't given, should throw an error.", async () => {
  assert.throws(
    () => {
      convertVolume("", "ml", 10);
    },
    { name: "Error", message: volumeErrors.missingParameters }
  );
});
