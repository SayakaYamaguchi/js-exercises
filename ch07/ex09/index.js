/*
`"𠮷野家"[0]`や `"👨‍👨‍👧‍👧"[0]` が何を返す調べなさい。それぞれの結果について説明しなさい。問題 7.8 で得た絵文字に対する知見も述べなさい。
**出題範囲**: 7.10
*/
let s = "𠮷野家";
console.log(s.charAt(0));   // =>�
console.log(s[1]);          // =>�

console.log(s.charAt(1));   // =>�
console.log(s[2]);          // =>野　　普通の文字なら表示


// 期待した文字の結果ではなく。Unicodeの一部を返す

// ex08と同じようにIntl.Segmenterでセグメンテーションの粒度を設定し取得すれば、一文字だけの取得が可能
const segmenter = new Intl.Segmenter("ja", { granularities: ["graphemeCluster"] });

// 𠮷野家 の最初の文字を取得
const segments1 = segmenter.segment("𠮷野家");
const firstChar1 = Array.from(segments1, segment => segment.segment)[0];
console.log(firstChar1); // "𠮷"

// 👨‍👨‍👧‍👧 の最初の文字を取得
const segments2 = segmenter.segment("👨‍👨‍👧‍👧");
const firstChar2 = Array.from(segments2, segment => segment.segment)[0];
console.log(firstChar2); // "👨‍👨‍👧‍👧"
