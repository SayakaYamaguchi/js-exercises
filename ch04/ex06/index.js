/**
以下の `resize` 関数を書き直した 2 つの関数を作成しなさい

- `if` を利用せず `&&` や `||` を用いて `maxWidth` や `maxHeight` を設定する関数 (`resize1`)
- `if` を利用せず `?.` や `??` を用いて `maxWidth` や `maxHeight` を設定する関数 (`resize2`)

```js
// 何らかのリサイズを行う関数と思って読んで下さい
//
// - params には undefined またはオブジェクトが与えられる
// - params.maxWidth が与えられる場合 (正の整数と仮定して良い) はその値を利用する
// - params.maxHeight が与えられる場合 (正の整数と仮定して良い) はその値を利用する
```
function resize(params) {
  let maxWidth = 600;
  let maxHeight = 480;
  console.log(params);
  if (params && params.maxWidth) {
    maxWidth = params.maxWidth;
  }

  if (params && params.maxHeight) {
    maxHeight = params.maxHeight;
  }

  console.log({ maxWidth, maxHeight });
}
 */


function resize1(params) {
  let maxWidth = params && params.maxWidth !== undefined ? params.maxWidth : 600;
  let maxHeight = params && params.maxHeight !== undefined ? params.maxHeight : 480;
// let maxWidth = params && params.maxWidth || 600;   ||を使うと0が整数の圧化ではなくなる
//  let maxHeight = params && params.maxHeight || 480;
  console.log({ maxWidth, maxHeight });
}

function resize2(params) {
  let maxWidth = params?.maxWidth ?? 600;
  let maxHeight = params?.maxHeight ?? 480;
  console.log({ maxWidth, maxHeight });
}

const maxObj = {maxWidth:15, maxHeight:30}
// const maxObj = {maxWidth:0, maxHeight:0}
// const maxObj = {maxWidth:0, maxHeight:undefined}
//const maxObj = {maxWidth:undefined, maxHeight:undefined}

console.log(maxObj.maxWidth + ':' + maxObj.maxHeight);
resize1(maxObj);
resize2(maxObj);
