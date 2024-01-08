import { convertNewline } from "./index.js";
// const { convertNewline } = require('./index.js');

describe("convertNewline", () => {
    it("LF → CRLFにコンバート", () => {
        const input = 'Hello\nWorld\n';
        const expected = 'Hello\r\nWorld\r\n';
        const result = convertNewline(input);
        expect(result).toBe(expected);
    });
  
    it("CRLF → LFにコンバート", () => {
        const input = 'Hello\r\nWorld\r\n';
        const expected = 'Hello\nWorld\n';
        const result = convertNewline(input);
        expect(result).toBe(expected);
    });
  
    it("混在コードにコンバート", () => {
        const input = 'Mixed\nnewlines\r\nhere\n';
        const expected = 'Mixed\r\nnewlines\r\nhere\n';
        const result = convertNewline(input);
        expect(result).toBe(expected);
    });
  
  });
