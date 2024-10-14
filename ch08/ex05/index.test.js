import {sequenceToObject} from "./index.js";

// 1
describe("sequenceToObject", () => {
    it("正常", () => {
        expect(sequenceToObject("a", 1, "b", 2)).toEqual({a: 1, b: 2});
    });
    it("奇数が文字列", () => {
        expect(sequenceToObject(0, 1, "b", 2)).toBe("プロパティ名が文字列以外になっている");
    });
    it("負の整数", () => {
        expect(sequenceToObject("b",-5,"a", 1, "b", 2)).toEqual({b: -5, a: 1, b: 2});
    });
});

