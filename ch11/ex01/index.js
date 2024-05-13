/*
## 問題 11.1 💻🧪
以下のような動作を実現する、 `TypeMap` クラスを作成しなさい。
```js
class Foo {}
const typeMap = new TypeMap();
typeMap.set(String, "string");
typeMap.set(Number, 123);
typeMap.set(Foo, new Foo());
typeMap.set(Date, "not a date"); // -> Error

typeMap.get(String); // -> "string"
typeMap.get(Number); // -> 123
```
- `Map` と同様のインタフェース(`get`, `set`)を持つ。ただし、`key` はコンストラクタ関数に限定する
- `set` では、 コンストラクタ関数の `key` と そのクラスの `value` のみ受け付け、それ以外の値が渡された場合はエラーとする。
これにより、`get` で取得する値が `key` に指定したコンストラクタ関数のクラスであることを保証する。
- TypeScriptの場合はそのような `key`, `value` の型定義とする
- プリミティブ値は、ラッパークラスのコンストラクタ関数で `get`/`set` 可能とする
**出題範囲**: 11.1 */

export class TypeMap {
  constructor() {
    this.map = new Map(); // インスタンス変数の初期化
  }

  // 指定されたコンストラクタ関数と値をマッピングするメソッド
  set(keyconstructor, value) {

    // 条件：`key` はコンストラクタ関数に限定する
    if (!(keyconstructor instanceof Function)) {
      // if (typeof keyConstructor !== 'function' || !isConstructor(keyConstructor)) {

      throw new Error("keyconstructor が関数ではない");
    }
    // value がプリミティブの場合、対応するラッパークラスのコンストラクタを使用する
    this.map.set(keyconstructor, value); // constructor と value を Map オブジェクトに登録
  }

  // 指定されたコンストラクタ関数に対応する値を取得するメソッド
  get(keyconstructor) {
    if (!(keyconstructor instanceof Function)) {
      // 渡された constructor が関数ではない場合にエラーをスロー
      throw new Error("keyconstructor が関数ではない");
    }
    return this.map.get(keyconstructor); // 指定された constructor に対応する値を取得して返す
  }
}

class Foo {}
const typeMap = new TypeMap();

typeMap.set(String, "string");
typeMap.set(Number, 123);
typeMap.set(Foo, new Foo());
typeMap.set(Date, "not a date"); // -> Error

// 日付をキーとして使用することはできない
try {
  typeMap.set(Date, "not a date"); // Error: Key must be a constructor function
} catch (error) {
  console.error(error.message);
}

 console.log(typeMap.get(String)); // -> "string"
 console.log(typeMap.get(Number)); // -> 123
