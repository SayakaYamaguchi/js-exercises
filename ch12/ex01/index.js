/*
## 問題 12.1 💻

以下の関数 `counterIter()` 及び `counterGen()` を利用して、イテレータ及びジェネレータに対して、どのような操作をした時にどの部分が実行されるのか、動作を確認しなさい。

例

- 明示的に[イテレータインタフェース](https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-iteration) のメソッドを呼んだり、間接的に呼んだりする
- ジェネレータ関数によって生成されたオブジェクトが[イテレータインタフェース](https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-iteration)を満たしていることを確認する
- `return()` や `throw()` がどのようなときに呼ばれるのか確認する
- ジェネレータ関数の中身がどのタイミングで初めて実行されるか確認する

```js
```

**出題範囲**: 全体
*/

// 引数 max を受け取り、1から max までカウントするイテレーターオブジェクトを返す
function counterIter(max) {
    // 関数が呼ばれたときに表示
    console.log("counterIter");
    let c = 1;
    return {
      // 
      [Symbol.iterator]() {
        console.log("counterIter: Symbol.iterator");
        return this;
      },
      // next() 現在のcの値を返し、次の呼び出しに備えて c をインクリメント
      next() {
        console.log("counterIter: next");
        if (c >= max + 1) {
          // cがmaxを超えたら終了
          return { value: undefined, done: true };
        }
        const value = c;
        c++;
        return { value, done: false };
      },
      // イテレーションを終了し、オプションで終了時の値を設定
      return(value) {
        console.log("counterIter: return:", value);
        return { value, done: true };
      },
      // イテレーション中に例外をスロー
      throw(e) {
        console.log("counterIter: throw:", e);
        throw e;
      },
    };
  }
  
  function* counterGen(max) {
    // ジェネレーターが最初に呼び出されたときに表示
    console.log("counterGen");
    try {
      for (let c = 1; c <= max; c++) {
        console.log("counterGen: next");
        yield c;
      }
    } catch (e) {
      console.log("counterGen: catch:", e);

    // ジェネレーター終了時
    } finally {
      console.log("counterGen: finally");
    }
}

const iter = counterIter(3);
console.log("Calling next()");
console.log(iter.next()); // { value: 1, done: false }
console.log(iter.next()); // { value: 2, done: false }
console.log(iter.next()); // { value: 3, done: false }
console.log(iter.next()); // { value: undefined, done: true }


console.log(iter.return("early")); // { value: undefined, done: true }
// return(value)メソッドは直接指定で実行する。ループではなく最短で動かす場合に使用

/*
  next()の度に続きからカウントしたvalueするが、
  valueが引数を超えるとvalueはundefinedとなり、done:がtrueとなるためnextメソッドから外れる
*/