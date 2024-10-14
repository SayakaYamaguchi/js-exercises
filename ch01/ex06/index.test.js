import { fib } from "./index.js";
// const { fib } = require('./index.js');

  describe("fib", () => {
    it("fib(0) は `0` の値を返す", () => {
      expect(fib(0)).toBe(0);
    });
    it("fib(1) は `1` の値を返す", () => {
      expect(fib(1)).toBe(1);
    });
    it("fib(2) は `1` の値を返す", () => {
      expect(fib(2)).toBe(1);
    });
    it("fib(5) は `5` の値を返す", () => {
      expect(fib(5)).toBe(5);
    });
    it("fib(6) は `8` の値を返す", () => {
      expect(fib(6)).toBe(8);
    });
    it("fib(50) は `12586269025` の値を返", () => {
      expect(fib(50)).toBe(12586269025);
    });
  });

