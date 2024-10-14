/*
## 問題 3.6 💻 📄
以下の文字列メソッドと同等の結果を返す関数を自作しなさい。
- `substring` 文字列の先頭（左側）に特定の文字列を追加して、指定した長さになるように調整
- `slice`     配列または文字列から指定された範囲の部分を取り出すために使用されるメソッド
- `padStart`  指定された長さになるように、文字列の先頭（左側）に特定の文字列を追加します。
- `trim`      文字列の先頭および末尾から空白文字（空白、タブ、改行など）を取り除いた新しい文字列を返します。元の文字列は変更されません。

各関数は第一引数に対象の文字列を受け取り、第二引数以降に元のメソッドの第一引数以降を受け取るものとする。
[ex06/index.test.js](./ex06/index.test.js) のテストを全てパスするように index.js (または index.ts) を作成しなさい。
**出題範囲**: 3.3.3
*/

export function substring(str, indexStart, indexEnd) {
  return str.substring(indexStart, indexEnd);
}

export function slice(str, indexStart, indexEnd) {
  return str.slice(indexStart, indexEnd);
}

export function padStart(str, targetLength, padString) {
  return str.padStart(targetLength, padString);
}

export function trim(str) {
  return str.trim();
}
