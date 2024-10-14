import fs from 'fs';
import fetch from 'node-fetch';

// アップロードするファイルのパス
const filePath = 'C:/www/http_server/fileL.txt'; // 実際のファイルパスを指定してください

// メモリ使用量をログに出力する関数
function logMemoryUsage(stage) {
  const memoryUsage = process.memoryUsage();
  console.log(`Memory usage at ${stage}:`);
  console.log(`  rss: ${Math.round(memoryUsage.rss / 1024 / 1024 * 100) / 100} MB`);
  console.log(`  heapTotal: ${Math.round(memoryUsage.heapTotal / 1024 / 1024 * 100) / 100} MB`);
  console.log(`  heapUsed: ${Math.round(memoryUsage.heapUsed / 1024 / 1024 * 100) / 100} MB`);
  console.log(`  external: ${Math.round(memoryUsage.external / 1024 / 1024 * 100) / 100} MB`);
}

// ファイルアップロード前のメモリ使用量
logMemoryUsage("before upload");

// PUT リクエストでファイルをアップロード
fetch('http://localhost:8000/uploaded-fileL-Createread.txt', {
  method: 'PUT',
  body: fs.createReadStream(filePath), // ストリームとしてファイルを送信
  headers: {
    'Content-Type': 'application/octet-stream'  // ファイルのMIMEタイプ
  }
})
  .then(response => response.text())
  .then(data => {
    console.log('Upload successful:', data);
    // ファイルアップロード後のメモリ使用量
    logMemoryUsage("after upload");
  })
  .catch(err => {
    console.error('Error during upload:', err);
  });
