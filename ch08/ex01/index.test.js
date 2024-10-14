import {ans12, factorial, currentTime} from "./index.js";

// 1
describe("ans12", () => {
    it("第一引数が整数", () => {
        const expectedOutput = ["abc","abc","abc"];
        expect(ans12(3,"abc")).toEqual(expectedOutput);
    });

    it("第一引数が負の整数", () => {
        const expectedOutput = [];
        expect(ans12(-1,"abc")).toEqual(expectedOutput);
    });
    it("第一引数が0", () => {
        const expectedOutput = [];
        expect(ans12(0,"abc")).toEqual(expectedOutput);
    });
    it("空", () => {
        const expectedOutput = [ "", "", "" ];
        expect(ans12(3,"")).toEqual(expectedOutput);
    });
    it("空", () => {
        const expectedOutput = [ undefined, undefined, undefined ];
        expect(ans12(3,)).toEqual(expectedOutput);
    });

});


// 2
describe("factorial", () => {
    it("整数", () => {
        expect(factorial(5)).toBe(120);
    });
    it("負の整数", () => {
    expect(factorial(0)).toBe("引数が0または負の整数");
    });
    it("文字列", () => {
        expect(factorial("あいうえお")).toBe("引数が数値以外");
    });
    it("空", () => {
    expect(factorial()).toBe("引数が数値以外");
    });
});

// 3
describe("currentTime", () => {
    it("整数", () => {
        const newDate = {"now" : new Date()};
        expect(currentTime()).toEqual(newDate);
    });
    it("負の整数", () => {
        const newDate = {"now" : new Date()};
    expect(currentTime(0)).toEqual(newDate);
    });
});


