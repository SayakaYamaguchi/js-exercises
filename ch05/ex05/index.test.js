import {leaveEvenNumbers} from "./index.js";
const obj = {a: 1, b: 2, c: 3};
const obj2 = {a: 5, b: -1, c: 100};
const obj3 = {a: 51, b: -15, c: 99};

describe("leaveEvenNumbers", () => {
    it("{a: 1, b: 2, c: 3}でvalueが奇数の値を削除", () => {
        expect(leaveEvenNumbers(obj)).toEqual({b: 2});
    });
    it("{a: 1, b: 2, c: 3}でvalueが奇数の値を削除", () => {
        expect(leaveEvenNumbers(obj2)).toEqual({c: 100});
    });
    it("{a: 1, b: 2, c: 3}でvalueが奇数の値を削除", () => {
        expect(leaveEvenNumbers(obj3)).toEqual({});
    });
})