import { HiraganaChar } from "./index.js";

describe('HiraganaChar', () => {

    test('正常：ひらがなを返す', () => {
        const hiragana = new HiraganaChar('あ');
        expect(`${hiragana}`).toBe('あ');
    });

    test('正常：UTF-16 コード単位を返す', () => {
        const hiragana = new HiraganaChar('あ');
        expect(+hiragana).toBe(0x3042);
    });

    test('エラー：アルファベット、かな二文字、空', () => {
        expect(() => new HiraganaChar('a')).toThrow('1文字のひらがなを指定してください');
        expect(() => new HiraganaChar('あい')).toThrow('1文字のひらがなを指定してください');
        expect(() => new HiraganaChar('')).toThrow('1文字のひらがなを指定してください');
    });

    test('デフォルトのヒントとしてひらがな文字を返す', () => {
        const hiragana = new HiraganaChar('あ');
        expect(hiragana + '').toBe('あ');
    });

    test('ひらがな文字はUTF-16コード単位でソート', () => {
        const chars = ['さ', 'か', 'あ', 'た'].map(char => new HiraganaChar(char));
        const sorted = chars.sort((a, b) => a > b ? 1 : -1);
        const sortedChars = sorted.map(char => char.char);
        expect(sortedChars).toEqual(['あ', 'か', 'さ', 'た']);
    });
});
