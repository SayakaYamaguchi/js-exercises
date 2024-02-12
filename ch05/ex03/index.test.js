import {checkHolidayIf, checkHolidaySwitch} from "./index.js";

describe("checkHolidayIf", () => {
    it("If文で日曜日を入力した場合:true", () => {
        expect(checkHolidayIf('日')).toBe(true);
    });
    it("If文で土曜日を入力した場合:true", () => {
        expect(checkHolidayIf('土')).toBe(true);
    });
    it("If文で月曜日を入力した場合:false", () => {
        expect(checkHolidayIf('月')).toBe(false);
    });
    it("If文で空入力した場合:false", () => {
        expect(checkHolidayIf()).toBe(false);
    });
})

describe("checkHolidaySwitch", () => {
    it("Switch文で日曜日を入力した場合:true", () => {
        expect(checkHolidaySwitch('日')).toBe(true);
    });
    it("Switch文で土曜日を入力した場合:true", () => {
        expect(checkHolidaySwitch('土')).toBe(true);
    });
    it("Switch文で月曜日を入力した場合:false", () => {
        expect(checkHolidaySwitch('月')).toBe(false);
    });
    it("Switch文で空入力した場合:false", () => {
        expect(checkHolidaySwitch()).toBe(false);
    });
})