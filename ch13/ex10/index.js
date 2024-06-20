/*
## 問題 13.10 💻🧪

`fetchSumOfFileSizes` を `Promise.all` を使って書き換え、ディレクトリ内のファイルサイズを同時並行で取得するようにしなさい。

**注意**: `Promise.all` を使う時は注意すること (例えば Web API の呼び出しを並行に実行すると、数次第で何らかのエラーに繋がる可能性がある)

**出題範囲**: 13.3
*/

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

    // 各ファイルの情報を取得するPromiseを生成
    // files 配列の各ファイルに対して fsPromises.stat を呼び出し、その結果をPromiseの配列として statsPromises に格納
    const statsPromises = files.map(file => fsPromises.stat(join(path, file))); 
    
    // 全てのPromiseが解決するのを待つ
    // Promise.all を使うことで、全てのファイルの情報が取得できるまで待ちます。並行して取得するので時間短縮
    const statsArray = await Promise.all(statsPromises); 

    // 取得したファイル情報（statsArray）のサイズを合算。reduce で各ファイルサイズを足す
    const total = statsArray.reduce((acc, stats) => acc += stats.size, 0); 

    /* 旧Ver   →forで１ファイルずつまわしていたのでファイルサイズ次第では遅い
    let total = 0; // 合計サイズを初期化
    for (const file of files) {
      const stats = await fsPromises.stat(join(path, file)); // 各ファイルの情報を取得　
      total += stats.size; // ファイルサイズを合計に加算
    }
*/
    return total; // 合計サイズを返す
  } catch (err) {
    throw err; // エラーがあれば投げる
  }
}