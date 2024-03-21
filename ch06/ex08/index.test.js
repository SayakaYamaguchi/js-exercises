import { restrict, subtract } from "./index.js";

// テスト
const obj = { x: 1, y: 2, z: 3 };
const template = { x: 1, y: 2 };
const ans = { x: 1, y: 2 }; 

const obj2 = { a: 1, b: 2, c: 3 };
const source1 = { a: 1, b: 2 };
const source2 = { b: 2 };
const ans2 = { c: 3 }; 

describe("restrict", () => {
  it("restrict test 出力: { x: 1, y: 2 }", () => {
    expect(restrict(obj,template)).toEqual(ans);
  });
});

describe("subtract", () => {
  it("subtract test 出力: { c: 3 }", () => {
    expect(subtract(obj2, source1, source2)).toEqual(ans2);
  });
});

