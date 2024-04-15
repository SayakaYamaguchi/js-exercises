/*
## 問題 8.4 🖋️

以下の入れ子の関数とアロー関数のコード実行結果を予想してから実行し、結果を説明しなさい。

```js
const obj = {
  om: function () {
    const nest = {
      nm: function () {
        console.log(this === obj, this === nest);
      },
      arrow: () => {
        console.log(this === obj, this === nest);
      },
    };
    nest.nm();
    nest.arrow();
  },
};
obj.om();
```

**出題範囲**: 8.2.2
*/
const obj = {
    om: function () {
      const nest = {
        nm: function () {   // 関数
          console.log(this === obj, this === nest);
          // this：呼び出し元のオブジェクト
          // 直接の呼び出しはnest.nm();
          // objはfalse、nestはtrue
        },
        arrow: () => {      // アロー関数
          console.log(this === obj, this === nest);
          // 直接の呼び出しはnest.arrow();だが
          // アロー関数は関数が定義されたコンテキストを指すため外側のスコープ（obj）を指す
        },
      };
      nest.nm();
      nest.arrow();
    },
};
obj.om();

// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Functions/Arrow_functions

