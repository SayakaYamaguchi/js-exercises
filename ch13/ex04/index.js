/*
## 問題 13.4 💻🧪

実は最近の Node.js は `Promise` 版の `fs` ライブラリを提供している。
このため先の問題のようにわざわざ自分で Promise 版の関数を作る必要はない。

```js
import * as fs from "node:fs";
import * as fsPromises from "node:fs/promises";
13-4 fs.stat(join(.... <- path.joinにしないと動かないかと。。
fsPromises
  .mkdir("A")
  .then(() => fsPromises.mkdir("B"))
  .then(() => fsPromises.mkdir("C"));
```

それでは以下の 2 つの関数を `node:fs/promises` を利用し Promise を返す関数に書き換えなさい:

```js

```

**出題範囲**: 13.2
*/
const fs = require('node:fs/promises');
const { join } = require('path');

// ディレクトリ内の最初のファイルのサイズを返す関数
export function fetchFirstFileSize(path) { 
  return fs.readdir(path)       // promise開始　fs.readdir(path): pathディレクトリ内のファイルを読み取る
    .then(files => {            // fs.readdir(path)が解決（成功）すると、このthenブロックが実行。ディレクトリ内のファイル名の配列を受け取る
      if (files.length === 0) { // ディレクトリが空の場合nullを返す
        return null;
      }
      return fs.stat(join(path, files[0]))  // ディレクトリ内の最初のファイルの情報を取得
        .then(stats => stats.size);         // ファイルのサイズを返す
    })
    .catch(err => {
      throw err;
    });
}

// ディレクトリ内のすべてのファイルのサイズの合計を返す関数
export function fetchSumOfFileSizes(path) {
  return fs.readdir(path)     // promise開始　fs.readdir(path): pathディレクトリ内のファイルを読み取とthenブロックが実行。
    .then(files => {          // .readdir(path)が解決（成功）すると、このthenブロックが実行
      const promises = files.map(file => // 
        fs.stat(join(path, file)).then(stats => stats.size)   // 各ファイルのサイズを取得するPromiseの配列を作成
      );
      return Promise.all(promises).then(sizes => sizes.reduce((total, size) => total + size, 0));   // すべてのファイルサイズを合計
    })
    .catch(err => {
      throw err;
    });
}