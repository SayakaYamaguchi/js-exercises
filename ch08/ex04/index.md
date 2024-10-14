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