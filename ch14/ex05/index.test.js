import { determiningType } from "./index.js";


describe('determiningType', () => {
    test('文字列リテラルに値を挿入する場合', () => {
        const result = determiningType`${"A"}`;
        expect(result).toBe('string');
    });
    test('文字列リテラルに値を挿入する場合', () => {
        const result = determiningType`${"いろはにほへと", "いろはにほへと"}`;
        expect(result).toBe('string');
    });
    test('オブジェクト', () => {
        const result = determiningType`${{x: 1}}`;
        expect(result).toBe('object');
    });

    test('数値', () => {
        const result = determiningType`${42}`;
        expect(result).toBe('number');
    });
    test('boolean型', () => {
        const result = determiningType`${true}`;
        expect(result).toBe('boolean');
    });

});


