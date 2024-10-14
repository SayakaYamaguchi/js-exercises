import fetch from 'node-fetch';
import fs from 'fs';

// ファイルを取得し、ローカルに保存する例
fetch('http://localhost:8000/hello.txt')
  .then(res => res.text())  // ファイルの内容をテキストとして取得
  .then(data => {
    fs.writeFileSync('downloaded_hello.txt', data);  // ローカルに保存
    console.log('File downloaded and saved as downloaded_hello.txt');
  })
  .catch(err => console.error('Error:', err));
