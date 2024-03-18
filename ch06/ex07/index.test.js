import {assign, ObjAssign} from "./index.js";

  // テスト
  const source1 = { x: 1, y: 0 };
  const source2 = { y: 2, z: 3 };
  const source3 = { x: 1, y: 2, z: 3 };
  
  const source4 = { x: 1, y: 0 };
  const source5 = { y2: 10, z: 3 };
  const source6 = { x: 1, y: 0, y2: 10, z: 3 };

  describe("assign", () => {
    it("プロパティが重複したオブジェクト", () => {
      expect(assign(source1,source2)).toStrictEqual(source3);
    });
    it("プロパティが重複しないオブジェクト", () => {
      expect(assign(source4,source5)).toStrictEqual(source6);
    });
  });



  describe("ObjAssign", () => {
    it("Obj.assign()使用", () => {
      expect(ObjAssign(source1,source2)).toStrictEqual(source3);
    });
    it("Obj.assign()使用", () => {
      expect(ObjAssign(source4,source5)).toStrictEqual(source6);
    });
  });
