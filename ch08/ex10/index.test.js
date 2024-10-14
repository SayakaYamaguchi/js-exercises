import { addMyCall } from "./index.js";

describe("addMyCall", () => {
  test("When given function has no arg, then it can call this 指定された関数に引数がない場合、これを呼び出すことができます", () => {
    const f = function () {
      return this.a;
    };
    addMyCall(f);
    expect(f.myCall({ a: 1 })).toBe(1);
  });

  test("When given function has 1 arg, then it can call this 指定された関数に 1 つの引数がある場合、これを呼び出すことができます", () => {
    const f = function (x) {
      return this.a + x;
    };
    addMyCall(f);
    expect(f.myCall({ a: 1 }, 2)).toBe(3);
  });

  test("When given function has multiple args, then it can call this 指定された関数に複数の引数がある場合、これを呼び出すことができます", () => {
    const f = function (x, y, z, u, v) {
      return this.a + x + y + z + u + v;
    };
    addMyCall(f);
    expect(f.myCall({ a: 1 }, 2, 3, 4, 5, 6)).toBe(21);
  });
});
