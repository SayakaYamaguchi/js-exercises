import fs from 'fs';
import fetch from 'node-fetch';

// アップロードするファイルのパス
const filePath = 'C:/www/http_server/fileL.txt'; // 実際のファイルパスを指定してください

// fs.readを使用してファイルを読み込んでからアップロード
fs.open(filePath, 'r', (err, fd) => {
  if (err) {
    console.error('Error opening file:', err);
    return;
  }

  // ファイルサイズを取得
  fs.fstat(fd, (err, stats) => {
    if (err) {
      console.error('Error getting file stats:', err);
      return;
    }

    // バッファの作成
    const buffer = Buffer.alloc(stats.size);

    // メモリ使用量をログに出力する関数（MB単位）
    function logMemoryUsage(stage) {
      const memoryUsage = process.memoryUsage();
      console.log(`Memory usage at ${stage}:`);
      console.log(`  rss: ${Math.round(memoryUsage.rss / 1024 / 1024 * 100) / 100} MB`);
      console.log(`  heapTotal: ${Math.round(memoryUsage.heapTotal / 1024 / 1024 * 100) / 100} MB`);
      console.log(`  heapUsed: ${Math.round(memoryUsage.heapUsed / 1024 / 1024 * 100) / 100} MB`);
      console.log(`  external: ${Math.round(memoryUsage.external / 1024 / 1024 * 100) / 100} MB`);
    }

    // ファイル読み込み前のメモリ使用量
    logMemoryUsage("before reading file");

    // ファイルをバッファに読み込む
    fs.read(fd, buffer, 0, stats.size, 0, (err, bytesRead, buffer) => {
      if (err) {
        console.error('Error reading file:', err);
        return;
      }

      // ファイル読み込み後のメモリ使用量
      logMemoryUsage("after reading file");

      // PUTリクエストで読み込んだバッファをアップロード
      fetch('http://localhost:8000/uploaded-fileL-fs-read.txt', {
        method: 'PUT',
        body: buffer, // バッファの内容を送信
        headers: {
          'Content-Type': 'application/octet-stream',
        },
      })
        .then((response) => response.text())
        .then((data) => {
          console.log('Upload successful:', data);
          fs.close(fd, () => {}); // ファイルを閉じる
        })
        .catch((err) => {
          console.error('Error during upload:', err);
        });
    });
  });
});
