/*
## 問題 3.11 💻
`Symbol()` を使い、同じ文字列から生成された 2 個の `Symbol` 変数を作成し、それらをプロパティとして持つオブジェクトを作成しなさい。
そのオブジェクトに対して、作成した`Symbol`変数を使って各プロパティの値を取得しなさい。
また、`Symbol()`ではなく、`Symbol.for()`で同名の変数を作成した場合の挙動を確認しなさい。
**出題範囲**: 3.6
*/

const Symbol1 = Symbol("mySymbol");
const Symbol2 = Symbol("mySymbol");

const myObj = {
  [Symbol1]: "Value for symbol1",
  [Symbol2]: "Value for symbol2",
}

const value1 = myObj[Symbol1];
const value2 = myObj[Symbol2];

console.log("value1:", value1);
console.log("value2:", value2);

export function equalArrays(array1, array2) {
  if (array1.length !== array2.length) {
    return false;
  }
  return true;
}


