import {exponentiationComeback, exponentiationLoop} from "./index.js";

// 1
describe("exponentiationComeback", () => {
    console.log('再起：');
    it("整数、整数", () => {
        expect(exponentiationComeback(2,3)).toEqual(8);
    });
    it("0、整数", () => {
        expect(exponentiationComeback(0,3)).toEqual(0);
    });
    it("整数、0", () => {
        expect(exponentiationComeback(2,0)).toEqual(1);
    });
    it("負の整数、3", () => {   //　エラー
        expect(exponentiationComeback(-2,3)).toEqual(1);
    });
    it("3、負の整数", () => {  //　エラー
        expect(exponentiationComeback(2,-3)).toEqual(1);
    });
});

describe("exponentiationLoop", () => {
    console.log('ループ：');
    it("整数、整数", () => {
        expect(exponentiationLoop(2,3)).toEqual(8);
    });
    it("0、整数", () => {
        expect(exponentiationLoop(0,3)).toEqual(0);
    });
    it("整数、0", () => {
        expect(exponentiationLoop(2,0)).toEqual(1);
    });
    it("負の整数、3", () => {  //　エラー
        expect(exponentiationLoop(-2,3)).toEqual(1);
    });
    it("3、負の整数", () => {
        expect(exponentiationLoop(2,-3)).toEqual(1);
    });
});