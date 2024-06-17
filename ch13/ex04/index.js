/*
## 問題 13.4 💻🧪

実は最近の Node.js は `Promise` 版の `fs` ライブラリを提供している。
このため先の問題のようにわざわざ自分で Promise 版の関数を作る必要はない。

```js
import * as fs from "node:fs";
import * as fsPromises from "node:fs/promises";

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
import { promises as fsPromises } from "node:fs";
import { join } from "node:path";

export async function fetchFirstFileSize(path) {
  try {
    const files = await fsPromises.readdir(path); // ディレクトリの内容を取得
    if (files.length === 0) {
      return null; // ファイルがない場合は null を返す
    }
    const stats = await fsPromises.stat(join(path, files[0])); // 最初のファイルの情報を取得
    return stats.size; // ファイルサイズを返す
  } catch (err) {
    throw err; // エラーがあれば投げる
  }
}

export async function fetchSumOfFileSizes(path) {
  try {
    const files = await fsPromises.readdir(path); // ディレクトリの内容を取得
    let total = 0; // 合計サイズを初期化
    for (const file of files) {
      const stats = await fsPromises.stat(join(path, file)); // 各ファイルの情報を取得
      total += stats.size; // ファイルサイズを合計に加算
    }
    return total; // 合計サイズを返す
  } catch (err) {
    throw err; // エラーがあれば投げる
  }
}

// 使用例:
/*
fetchFirstFileSize("./some/path")
  .then(size => console.log("First file size:", size))
  .catch(err => console.error("Error:", err));

fetchSumOfFileSizes("./some/path")
  .then(totalSize => console.log("Total file sizes:", totalSize))
  .catch(err => console.error("Error:", err));
  */