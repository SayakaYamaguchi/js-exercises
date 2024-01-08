## 問題 2.7 🖋

以下のプログラムを実行し、挙動を確認しなさい。

```ts
let a = 0,
  b = 0;

// prettier-ignore
const c
=
a;
// prettier-ignore
++
b

console.log(a, b, c);

// prettier-ignore
const e = a++
b;

console.log(a, b, e);
```

**出題範囲**: 2.6


**結果**
```js
let a = 0, b = 0;

// prettier-ignore
const c = a;
// prettier-ignore
++b;

console.log(a, b, c);   // => 0 1 0

// prettier-ignore
const e = a++;
b;

console.log(a, b, e);   // => 1 1 0

```