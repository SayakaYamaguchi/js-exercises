/*

## 問題 3.5 💻 🧪

文字列中の改行コードを変換する関数とテストを作成しなさい。

- `LF` -> `CR+LF`
- `CR+LF` -> `LF`

**出題範囲**: 3.3.3*/

function convertNewline(text) {
    // LF to CRLF
    let result = text.replace(/\n/g, '\r\n');
    // CRLF to LF
    result = result.replace(/\r\n/g, '\n');
    return result;
  }

module.exports = { convertNewline };
// export default { convertNewline };