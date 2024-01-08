import { CheckNumbersSame } from "./index.js";

describe("CheckNumbersSame", () => {
    it("(0.3 - 0.2, 0.1) に対してtrue", () => {
      const result = CheckNumbersSame(0.3 - 0.2, 0.1);
      expect(result).toBe(true);
    });
  
    it("(0.2 - 0.1, 0.1) に対してtrue", () => {
      const result = CheckNumbersSame(0.2 - 0.1, 0.1);
      expect(result).toBe(true);
    });

  });