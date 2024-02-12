import { add } from "./index.js";

  describe("add", () => {
    it("returns same value when positive value given", () => {
      expect(add(1,2)).toBe(42);
    });

    it("returns negated value when negative value given", () => {
      expect(add(-42)).toBe(42);
    });

    it("returns zero value when zero given", () => {
      expect(add(0)).toBe(0);
    });
  });
