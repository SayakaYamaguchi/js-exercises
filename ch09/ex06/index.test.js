import { TypedMap } from "./index.js";
describe("TypedMap", () => {
    it("値を正しく設定・取得", () => {
      const map = new TypedMap("string", "number");
      map.set("key1", 10);
      map.set("key2", 20);
  
      expect(map.get("key1")).toBe(10);
      expect(map.get("key2")).toBe(20);
    });
  
    it("間違った型の値を設定するとエラーへスロー", () => {
      const map = new TypedMap("string", "number");
  
      expect(() => map.set(123, 10)).toThrow(TypeError);
      expect(() => map.set("key1", "value")).toThrow(TypeError);
    });
  
    it("存在しないキーを取得するとエラーへスロー", () => {
      const map = new TypedMap("string", "number");
  
      expect(() => map.get("nonexistent")).toThrow(TypeError);
    });
  
    it("値を正しくクリア", () => {
      const map = new TypedMap("string", "number");
      map.set("key1", 10);
      map.set("key2", 20);
  
      map.clear();
  
      expect(map.get("key1")).toBe(undefined);
      expect(map.get("key2")).toBe(undefined);
    });
  });