/*
## 問題 3.3 💻 🧪

2 個の数値を受け取り、それらの値が同値かどうかを判定する関数を作成しなさい。また、その動作を確認するテストを書きなさい。
（最低限、以下の組み合わせが動作することは確認すること。）

ただし、浮動小数点の誤差を考慮すること。ここでは `10^(-10)` 未満の誤差であれば要求される計算精度に影響はないと仮定します。

- `(0.3 - 0.2, 0.1) -> true`
- `(0.2 - 0.1, 0.1) -> true`

**出題範囲**: 3.2.4
*/

function CheckNumbersSame(a, b, tolerance = 1e-10){
   return (a-b) < tolerance; 
}

module.exports = { CheckNumbersSame };
export default { CheckNumbersSame };