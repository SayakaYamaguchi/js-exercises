/**
 * ## 問題 4.9 💻

typeof 演算子のオペランドに、`undefined`, `null`, `オブジェクト`, `NaN`, `数値`, `関数` を指定したときの返り値を予想しなさい。
その後実装しコンソール出力で確認しなさい。

**出題範囲**: 4.13.3
*/

console.log(typeof undefined);        // => undefined
console.log(typeof null);             // => object※バグ
console.log(typeof []);               // => object
console.log(typeof NaN);              // => number
console.log(typeof 123456);           // => number
console.log(typeof function(){});     // => function

console.log(typeof 'あいうえお');     // => string
