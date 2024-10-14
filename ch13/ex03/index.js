/*
## 問題 13.3 💻🧪

`Promise` コンストラクタを使うことでコールバックを要求する非同期関数を `Promise` を返す関数に変換することができる。
以下は Node.js 標準ライブラリのディレクトリ (フォルダ) を作成する関数 `fs.mkdir` を変換する例である:

```js
import * as fs from "node:fs";

function mkdir(path, options) {
  return new Promise((resolve, reject) => {
    fs.mkdir(path, options, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

// ディレクトリ A → B → C を順に作る以下のコード (※ エラーハンドリングは省略) を...
fs.mkdir("A", () => {
  fs.mkdir("B", () => {
    fs.mkdir("C", () => console.log("COMPLETED"));
  });
});

// 以下のように書くことができる
mkdir("A")
  .then(() => mkdir("B"))
  .then(() => mkdir("C"))
  .then(() => console.log("COMPLETED"));
```

同様にして以下の関数の Promise 版を作成しなさい:

- [fs.readdir](https://nodejs.org/api/fs.html#fsreaddirpath-options-callback)
- [fs.stat](https://nodejs.org/api/fs.html#fsstatpath-options-callback)

**出題範囲**: 13.2

*/

import * as fs from "node:fs";
/*
function mkdir(path, options) {
  return new Promise((resolve, reject) => {
    fs.mkdir(path, options, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

// ディレクトリ A → B → C を順に作る以下のコード (※ エラーハンドリングは省略) を...
fs.mkdir("A", () => {
  fs.mkdir("B", () => {
    fs.mkdir("C", () => console.log("COMPLETED"));
  });
});

// 以下のように書くことができる
mkdir("A")
  .then(() => mkdir("B"))
  .then(() => mkdir("C"))
  .then(() => console.log("COMPLETED"));

*/

// fs.readdir の Promise 版
  export function readdir(path, options) {
    return new Promise((resolve, reject) => {   // new Promise を作成
      fs.readdir(path, options, (err, files) => {
        if (err) {
          reject(err);      // エラーが発生した場合は reject を呼ぶ
          return;
        }
        resolve(files);     // 成功した場合は resolve を呼ぶ
      });
    });
  }
  readdir('./ch13/ex03/')
  .then(files => {
    console.log('Files:', files);
  })
  .catch(err => {
    console.error('Error reading directory:', err);
  });


  // fs.stat の Promise 版
  // ファイルやディレクトリの情報（サイズや作成日時など）を取得するための関数

  export function stat(path) {
    return new Promise((resolve, reject) => {          // new Promise を作成
      fs.stat(path, (err, stats) => {                   // Promise の中で fs.stat を呼び出す
        if (err) {
          reject(err);      // エラーが発生した場合は reject を呼ぶ
          return;
        }
        resolve(stats);     // 成功した場合は resolve を呼ぶ
      });
    });
  }

  stat('./ch13/ex03/sample.txt')
  .then(stats => {
    console.log('File Stats:', stats);                    // ファイル情報を表示
  })
  .catch(err => {
    console.error('Error getting file stats:', err);       // エラーを表示
  });
