import { instanceOf } from "./index.js";

describe("Private field test", () => {
      // テストケース
  class A {}
  class B extends A {}
  class C extends B {}
  
  const objA = new A();
  const objB = new B();
  const objC = new C();
  
    expect(instanceOf(objC, C)).toBe(true);
    expect(instanceOf(objC, B)).toBe(true);
    expect(instanceOf(objC, A)).toBe(true);

    expect(instanceOf(objB, B)).toBe(true);
    expect(instanceOf(objB, A)).toBe(true);
    
    expect(instanceOf({}, Object)).toBe(true);
    expect(instanceOf([], Array)).toBe(true);
    expect(instanceOf(123, Number)).toBe(true);

    expect(instanceOf(objA, B)).toBe(false);
    expect(instanceOf(objB, C)).toBe(false);
    expect(instanceOf(objC, Object)).toBe(false);   // エラー

});