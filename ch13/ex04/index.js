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

export function fetchFirstFileSize(path) {
  return fs.readdir(path)
    .then(files => {
      if (files.length === 0) {
        return null;
      }
      return fs.stat(join(path, files[0]))
        .then(stats => stats.size);
    })
    .catch(err => {
      throw err;
    });
}

export function fetchSumOfFileSizes(path) {
  return fs.readdir(path)
    .then(files => {
      const promises = files.map(file => 
        fs.stat(join(path, file)).then(stats => stats.size)
      );
      return Promise.all(promises).then(sizes => sizes.reduce((total, size) => total + size, 0));
    })
    .catch(err => {
      throw err;
    });
}