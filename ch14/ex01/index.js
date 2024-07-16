/*
## 問題 14.1 💻📄
与えられたテストを通過するように、プロパティ、属性を設定したオブジェクトを返す関数を作成しなさい。
**出題範囲**: 14.2
*/

// プロパティa　書き換え不可、設定不可のオブジェクトを返す
export function unwritableAndUnconfigurableObj() {
  const obj = { a: 1 };
  Object.defineProperty(obj, "a", {
    writable: false,        // 書き換え不可
    configurable: false,    // 設定変更不可
  });
  return obj;
}

// プロパティb　書き換え可能、設定不可にオブジェクトを返す
export function writableAndUnconfigurableObj() {
  const obj = { b: 2 };
  Object.defineProperty(obj, "b", {
    writable: true,         // 書き換え可
    configurable: false,    // 設定変更不可
  });
  return obj;
}

// ネストされたオブジェクトのすべてのプロパティを書き換え不可のオブジェクトを返す
export function nestedUnwritableObj() {
  const obj = {
    c: {
      d: {
        e: 3,
      },
    },
  };

  // 再帰的にオブジェクトすべてのプロパティを書き換え不可にし、設定変更不可にする
  function makePropertiesUnwritable(object) {
    Object.keys(object).forEach((key) => {
      if (typeof object[key] === "object" && object[key] !== null) {
        makePropertiesUnwritable(object[key]);  // ネストｓあれたオブジェクトにも適用
      }
      Object.defineProperty(object, key, {
        writable: false,          // 書き換え不可
        configurable: false,      // 設定変更を不可
      });
    });
    Object.seal(object); // 既存のプロパティを変更不可にし、新しいプロパティを追加不可にする
  }

  makePropertiesUnwritable(obj);  // 上記の関数を使用してオブジェクトを処理する
  return obj;
}

