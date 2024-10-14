/*
## 問題 3.13 💻
`valueOf()`, `toString()` を持つクラスを定義しなさい。
そのクラスのインスタンスを作成し、`valueOf()`, `toString()` を直接呼び出さずにそれぞれの結果を出力するコードを書きなさい。
クラス定義のサンプルコード
```js
class Example {
  valueOf() {
    // TODO
  }
  toString() {
    // TODO
  }
}
let obj = new Example();
```
**出題範囲**: 3.9.3.6
*/


class Example {
    constructor(value) {
        this.value = value;
    }
    valueOf() {
      // TODO
      return this.value * 2; // 仮の値を返す例;
    }
    toString() {
      // TODO
      return `Example object with value: ${this.value}`;
    }
  }
  let obj = new Example(8);

  console.log(obj + 1);    // => 17
  console.log(obj);    // => new Example{ value:8 }
  
  