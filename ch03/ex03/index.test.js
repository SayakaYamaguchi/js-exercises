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

    it("(1.1 - 0.5, 0.1) に対してtrue", () => {
      const result = CheckNumbersSame(1.1 - 0.5, 0.1);
      expect(result).toBe(false);
    });

  });