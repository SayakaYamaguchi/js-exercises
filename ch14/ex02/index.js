/*
## 問題 14.2 💻📄
`index.js`を完成させ、以下の要件を満たすクラスを作成しなさい。
`index.test.js`のテストが通ることを確認すること。

// - `MyArray`は`Array`を継承し、`map()`, `slice()`の結果として`MyArrayLike`のオブジェクトを返す。
//（結果の型を変更するには`Symbol.species`を指定する）
//- `MyArrayLike`は配列のようなクラスで`Array`を継承しない

**出題範囲**: 14.4.4
*/

export class MyArrayLike {
  constructor(items) {
    this.items = items;
    this.length = items.length;  // lengthプロパティを明示的に設定
  }

  [Symbol.iterator]() {
    let index = 0;
    const items = this.items;
    return {
      next() {
        if (index < items.length) {
          return { value: items[index++], done: false };
        } else {
          return { done: true };
        }
      },
    };
  }
}

export class MyArray extends Array {
  constructor(...items) {
    super(...items);
  }

  // TODO
  static get [Symbol.species]() {
    return MyArrayLike;
  }

  map(callback){
    const arrayResult = super.map(callback);
    return new MyArrayLike(arrayResult);
  }

  slice(start, end){
    const arrayResult = super.slice(start, end);
    return new MyArrayLike(arrayResult);
  }
}
