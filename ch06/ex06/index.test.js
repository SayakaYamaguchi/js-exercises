import {propsPush} from "./index.js";

  // テスト
  const inputString = 'This is a string with new line and a null character:"';
  const outputString = 'This is a string with new line and a null character:"';

  describe("propsPush", () => {
    it("returns same value when positive value given", () => {
      expect(convertWithLibIf(inputString)).toBe(outputString);
    });

  });

  describe("convertWithLibSwitch", () => {
    it("returns same value when positive value given", () => {
      expect(convertWithLibSwitch(inputString)).toBe(outputString);
    });

  });
