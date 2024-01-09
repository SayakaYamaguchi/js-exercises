/*
`Number()` 関数で `true`, `1234`, `"text"` をそれぞれ数値変換しコンソール出力しなさい。
同様に、`Boolean()` 関数で `1234`, `0` を真偽値変換、`String()` 関数で `true`, `1234` を文字列変換しなさい。
更に、`parseInt()` で `"12,742 km：地球の直径"`、 `parseFloat()` で `"1.618：黄金比"` を変換してコンソール出力しなさい。

**出題範囲**: 3.9.2
*/

// Number() 関数での数値変換
console.log(Number(true));                      // => 1 
console.log(Number(1234));                      // => 1234
console.log(Number("text"));                    // => NaN

// Boolean() 関数での真偽値変換
console.log(Boolean(1234));                     // => true
console.log(Boolean(0));                         // => false

// String() 関数での文字列変換
console.log(String(true));                      // => true
console.log(String(1234));                      // => 1234

// parseInt() での変換
console.log(parseInt("12,742 km：地球の直径")); // => 12

// parseFloat() での変換
console.log(parseFloat("1.618：黄金比"));       // => 1.628
