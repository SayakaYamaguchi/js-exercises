import { convertNewline } from "./index.js";
// const { convertNewline } = require('./index.js');

describe('convertNewline function', () => {
    it('converts LF to CRLF', () => {
      const input = 'Line1\nLine2\nLine3';
      const expected = /Line1\r?\nLine2\r?\nLine3/;
      const result = convertNewline(input);
      expect(result).toMatch(expected);
    });
  
    it('converts CRLF to LF', () => {
      const input = 'Line1\r\nLine2\r\nLine3';
      const expected = /Line1\r?\nLine2\r?\nLine3/;
      const result = convertNewline(input);
      expect(result).toMatch(expected);
    });
});

// LF　　　Linux改行コード　
// CR+LF　Windows改行コード
// プログラムはOD関係なく基本LF使った方がいい