import { abs, sum, factorial } from "./index.js";
// const { abs, sum, factorial } = require('./index.js');

describe("math", () => {
  describe("abs", () => {
    it("returns same value when positive value given", () => {
      expect(abs(42)).toBe(42);
    });

    it("returns negated value when negative value given", () => {
      expect(abs(-42)).toBe(42);
    });

    it("returns zero value when zero given", () => {
      expect(abs(0)).toBe(0);
    });
  });

  // 以下に sum, factorial のテストを記載せよ

  describe("sum", () => {
    it("全て空の値", () => {
      expect(sum([])).toBe(0);
    });

    it("合計数を返す 正の値+正の値", () => {
      expect(sum([1,2,3,4,5])).toBe(15);
    });

    it("合計数を返す 正の値+負の値", () => {
      expect(sum([-5,7,6])).toBe(8);
    });

    it("合計数が返す 0+負の値", () => {
      expect(sum([-1,-5])).toBe(-6);
    });
  });

  describe("factorial", () => {
    it("正の値が指定された場合、元の数から-1した値を順に乗法していく", () => {
      expect(factorial(5)).toBe(120);
    });

    it("負の値が指定された場合は undefined の値を返す", () => {
      expect(factorial(-12)).toBe('undefined');
    });

    it("0の階乗は0!=1のため、1が戻る", () => {
      expect(factorial(0)).toBe(1);
    });
  });
});


