import { equals } from "./index.js";


describe('equals', () => {
  it('別オブジェクトでも中身が同じならtrueを返す', () => {
    const obj1 = [1, 2, 3];
    const obj2 = [1, 2, 3];
    const result = equals(obj1,obj2);
    expect(result).toBe(true);
  });

  it('別オブジェクトで中身が別ならfalseを返す', () => {
    const obj1 = [1, 2, 1];
    const obj2 = [1, 2, 3];
    const result = equals(obj1,obj2);
    expect(result).toBe(false);
  });

});

