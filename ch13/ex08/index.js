/*
## 問題 13.8 💻🧪

`fetchFirstFileSize` および `fetchSumOfFileSizes` を async/await を使って書き直しなさい。



**出題範囲**: 13.3
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