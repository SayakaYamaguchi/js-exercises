import {TypeMap} from "./index.js";

  // テスト
  describe("TypeMap", () => {
    it("returns same value when positive value given", () => {
      class Foo {}
      const typeMap = new TypeMap();
      
      typeMap.set(String, "string");
      typeMap.set(Number, 123);
      typeMap.set(Foo, new Foo());
      typeMap.set(Date, "not a date"); // -> Error
      expect(typeMap.get(Date)).toBe("not a date");; // -> "string"
      expect(typeMap.get(String)).toBe("string");; // -> "string"
      expect(typeMap.get(Number)).toBe(123);; // -> 123
      
    });
  });