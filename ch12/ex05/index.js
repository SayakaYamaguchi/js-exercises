/*
## 問題 12.5 💻🧪
指定されたファイルパスを受け取り、そのファイルを改行コード `\n` の出現ごとに分割して返すジェネレータ関数 `function* readLines(filePath)` を作成しなさい。取得できる文字列からは改行コードが除去されていること。

ファイルの読み込みは一度にすべて読み込むのではなく、`fs.openSync()`, `fs.readSync()` を使って一定バッファサイズごとに読み込むようにし、必ず `fs.closeSync()` でファイルをクローズすること。
また、利用者側のイテレータのループの途中で `break` したり `throw` された場合でも `fs.closeSync()` されるようにすること。

読み込まれるファイルはテキストファイルであると想定して良い。
**出題範囲**: 12.3
*/
import fs from 'fs';

export function* readLines(filePath){
    // 一度に読み込むバイト数を指定 1024バイト（1KB)
    const bufferSize = 1024;
    const buffer = Buffer.alloc(bufferSize);
    let fileDescriptor;
    
    try{
        // readでオープン
        fileDescriptor = fs.openSync(filePath, 'r');
        let bytesRead;
        let leftover = '';
        
        // 指定されたバッファサイズごとにファイルを読み込む。読み込んだバイト数をbytesReadに格納。
        while ((bytesRead = fs.readSync(fileDescriptor, buffer, 0, bufferSize, null)) > 0) {
            // バッファの内容を文字列に変換し、leftoverと連結してから改行で分割
            let content = leftover + buffer.toString('utf8', 0, bytesRead);
            // バッファの内容を文字列に変換し、leftoverと連結してから改行で分割
            let lines = content.split('\n');

            // 最後の部分はまだ完全な行ではない可能性があるので残す
            leftover = lines.pop();

            for (const line of lines) {
                yield line;
            }
        }
        if(leftover){
            // 残った部分も行として返す
            yield leftover;
        }

    }catch(err){
        throw err;

    // finallyは例外がスローされても実行するのでファイルを確実にクローズするようにファイルクローズの処理をここに配置
    }finally{
        if(fileDescriptor !== undefined){
            fs.closeSync(fileDescriptor);
        }
    }
}

const filePath = './ch12/ex05/text.txt';
for (const line of readLines(filePath)) {
    console.log(line);
}

