/*
## 問題 8.12 💻📄
プログラミング言語によっては無名関数の引数名を省略し、短く書けるものがある。  
例えば以下のような処理の場合、 `(a, b) => a + b` 相当の無名関数を、 Swift では `{ $0 + $1 }` 、 Elixir では `&(&1 + &2)` のように書ける。
```js
console.log(arr.reduce((a, b) => a + b, 0));
console.log(arr.sort((a, b) => a - b));
```
JavaScript で同様の書き方ができるよう、 `Function` コンストラクタを用いて以下のコードが動作するような 関数 `f` を作成しなさい。
```js
console.log(arr.reduce(f("$1 + $2"), 0));
console.log(arr.sort(f("$1 - $2")));
```

- `f` は引数に関数の本体を文字列として受け取る
- 関数の本体で使用する引数は `$1`, `$2`, ... のように記載し、 `$10` までサポートする

**出題範囲**: 8.7.7
*/

export function f(body) {
    const escapedBody = body.replace(/\n/g, '\\n');         // 改行対応
//    console.log(body);
//    console.log(escapedBody);
    return new Function(...body.match(/\$[0-9]+/g) || [], 'return ' + escapedBody);
}

const arr = [1, 2, 3, 4, 5];
console.log(arr.reduce(f("$1 + $2"), 0));
console.log(arr.sort(f("$1 - $2")));

//　    expect(f("$1 + 1")(1)).toBe(2);
//　    expect(f("{ const result = $1 + $2;\n return result; }")(1, 2)).toBe(3);　　←未完
