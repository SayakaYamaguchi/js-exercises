import { daysCalculation, daysCount, dayWeek, dateObj } from "./index.js";


// 特定の年と月(1-12)を数値の引数で受け取り、その月の日数を返す関数
describe("daysCalculation", () => {
    it("checks if given string is e-mail address or not", () => {
        expect(daysCalculation(2023, 2)).toBe(28);
        expect(daysCalculation(2024, 2)).toBe(29);
        expect(daysCalculation(2024, 5)).toBe(31);
    })
});

//- 期間の開始日と終了日を'YYYY-MM-DD'形式の日付で二つ引数で受け取り、その期間(開始日と終了日を含む)の土日以外の日数を返す関数
describe("daysCalculation", () => {
    it("checks if given string is e-mail address or not", () => {
        expect(daysCount('2024-04-01', '2024-04-30')).toBe(22);
        expect(daysCount('2024-05-03', '2024-05-06')).toBe(2);
        expect(daysCount('2024-06-01', '2024-05-02')).toBe(0);
    })
});

//- 'YYYY-MM-DD'形式の日付とロケールを引数で受け取り、その日の曜日をロケールの形式の文字列で返す関数
describe("dayWeek", () => {
    it("", () => {
        expect(dayWeek('2024-07-01', 'ja-JP')).toBe("月曜日");
        expect(dayWeek('2024-05-01', 'ja-JP')).toBe("水曜日");
        expect(dayWeek('2024-07-01', 'en-US')).toBe("Monday");
    })
});
