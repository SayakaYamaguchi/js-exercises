
import { counter } from "./index.js";

describe("counter generator", () => {
    let c;

    beforeEach(() => {
        c = counter();
    });

    it("should increment count correctly", () => {
        expect(c.next().value).toBe(0);
        expect(c.next().value).toBe(1);
        expect(c.next().value).toBe(2);
    });

    it("should reset count when exception thrown", () => {
        expect(c.next().value).toBe(0);
        expect(c.next().value).toBe(1);
        expect(c.next().value).toBe(2);

        const resetResult = c.throw(new Error("Manual reset"));
        expect(resetResult.value).toBe("Counter reset due to Error: Manual reset");

        expect(c.next().value).toBe(0);
        expect(c.next().value).toBe(1);
    });

    it("should reset count when reset value provided", () => {
        expect(c.next().value).toBe(0);
        expect(c.next().value).toBe(1);

        const resetResult = c.next(5); // 5でリセット
        expect(resetResult.value).toBe(5);

        expect(c.next().value).toBe(6);
        expect(c.next().value).toBe(7);
    });
});
/*

import {counter} from "./index.js";

  // テスト
  describe("counter", () => {
    it("test", () => {
      // ジェネレータを作成
      const c = counter();
      // 初期の値を取得
      console.log(c.next().value); // Output: 0

      // カウントアップ
      console.log(c.next().value); // Output: 1
      console.log(c.next().value); // Output: 2

      // リセット
      console.log(c.throw(new Error("Manual reset"))); // Output: Counter reset due to Error: Manual reset
  // 再度カウントアップ
      
      typeMap.set(String, "string");
      typeMap.set(Number, 123);
      typeMap.set(Foo, new Foo());
      typeMap.set(Date, "not a date"); // -> Error
      expect(typeMap.get(Date)).toBe("not a date");; // -> "string"
      expect(typeMap.get(String)).toBe("string");; // -> "string"
      expect(typeMap.get(Number)).toBe(123);; // -> 123
      
    });
  });

    // ジェネレータを作成
const c = counter();

// 初期の値を取得
console.log(c.next().value); // Output: 0

// カウントアップ
console.log(c.next().value); // Output: 1
console.log(c.next().value); // Output: 2

// リセット
console.log(c.throw(new Error("Manual reset"))); // Output: Counter reset due to Error: Manual reset
  // 再度カウントアップ
  console.log(c.next().value); // Output: 0 */
  console.log(c.next().value); // Output: 1

/*
  // ジェネレータを作成
const c = counter();

// 初期の値を取得
console.log(c.next().value); // Output: 0

// カウントアップ
console.log(c.next().value); // Output: 1
console.log(c.next().value); // Output: 2

// リセット
console.log(c.throw(new Error("Manual reset"))); // Output: Counter reset due to Error: Manual reset

// 再度カウントアップ
console.log(c.next().value); // Output: 0
console.log(c.next().value); // Output: 1
*/