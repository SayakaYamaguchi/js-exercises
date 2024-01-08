/*
## 問題 3.1 💻

正負の ` Infinity` と `NaN` で `+`, `-`, `\*`, `/` の計算を全ての組み合わせでして結果を見なさい。

**出題範囲**: 3.2.3
*/

// 正の Infinity と 正の Infinity
console.log(Infinity + Infinity);       // Infinity
console.log(Infinity - Infinity);       // NaN
console.log(Infinity * Infinity);       // Infinity
console.log(Infinity / Infinity);       // NaN

// 正の Infinity と 負の Infinity
console.log(Infinity + (-Infinity));    // NaN
console.log(Infinity - (-Infinity));    // Infinity
console.log(Infinity * (-Infinity));    // -Infinity
console.log(Infinity / (-Infinity));    // NaN

// 負の Infinity と 負の Infinity
console.log((-Infinity) + Infinity);    // NaN
console.log((-Infinity) - Infinity);    // -Infinity
console.log((-Infinity) * Infinity);    // -Infinity
console.log((-Infinity) / Infinity);    // NaN

// 負の Infinity と 負の Infinity
console.log((-Infinity) + (-Infinity));    // -Infinity
console.log((-Infinity) - (-Infinity));    // NaN
console.log((-Infinity) * (-Infinity));    // Infinity
console.log((-Infinity) / (-Infinity));    // NaN
