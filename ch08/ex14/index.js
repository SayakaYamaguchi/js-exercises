/*
## 問題 8.14 💻🧪
以下の高階関数を実装しなさい
1. 残余パラメータとして任意の数の関数を受け取り、いずれかの関数が true を返せば true を返す新たな関数を返す`any` 関数
```js
const isNonZero = any(
  (n) => n > 0,
  (n) => n < 0
);
console.log(isNonZero(0)); // => false
console.log(isNonZero(42)); // => true
console.log(isNonZero(-0.5)); // => true
```
2.  引数として 2 つの関数を受け取り、1 つ目の関数で発生した例外を 2 つ目の関数の引数として処理し結果を返す新たな関数を返す`catching` 関数
```js
const safeJsonParse = catching(JSON.parse, (e) => {
  return { error: e.toString() };
});
console.log(safeJsonParse('{"a": 1}')); // => {a: 1}
console.log(safeJsonParse("{Invalid Json}")); // => {error: "SyntaxError: ..."}
```
**出題範囲**: 8.8.2
*/

// any 関数の実装
export function any(...funcs){             // 残余パラメータを任意の数の関数をfuncs[]に格納
    return function(...args){       // any関数が呼び出された際にargs[]へ引数を格納
        for(const func of funcs){   // 
            if(func(...args)){      // func[]に含まれる各関数に

                console.log(args);
                return true;
            }
        }
        return false;
    }
}

// catching 関数の実装
function catching(tryFunction, catchFunction) {
    return function(...args) {
      try {
        return tryFunction(...args);
      } catch (error) {
        return catchFunction(error);
      }
    };
  }

export const safeJsonParse = catching(JSON.parse, (e) => {
    return { error: e.toString() };
});

export const isNonZero = any(      // 引数が0より大きいor0より小さい場合にtrueを返す→引数が0かどうかわかる
    (n) => n > 0,
    (n) => n < 0
);

/*

console.log(isNonZero(0)); // => false
console.log(isNonZero(42)); // => true
console.log(isNonZero(-0.5)); // => true
  

console.log(safeJsonParse('{"a": 1}')); // => {a: 1}
console.log(safeJsonParse("{Invalid Json}")); // => {error: "SyntaxError: ..."}
  */