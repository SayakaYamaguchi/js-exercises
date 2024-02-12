import { bitCount } from "./index.js";

  describe("bitCount", () => {
    it("returns same value when positive value given", () => {
      expect(bitCount(0b111)).toBe(3);
    });

    it("returns negated value when negative value given", () => {
      expect(bitCount(0b1111111111111111111111111111111)).toBe(31);
    });

  });
