/*
## 問題 8.6 💻
以下の関数の引数を修正しなさい。また、修正した関数をアロー関数に書き直しなさい。
```js
const m = function (arg) {
  console.log(arg[1]);
};
m("a", "b");
```
**出題範囲**: 8.3.2
*/

const m = function (...arg) {
    console.log(arg[b]);
};
m("a", "b");


const m2 = (...arg) => console.log(arg[1]);
m2("a", "b");

    