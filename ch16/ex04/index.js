import fs from 'fs';
import iconv from 'iconv-lite';

// ファイルのパスを指定
const filePath = './hello.txt';

// ファイルを読み込み、エンコーディングを指定して表示
fs.readFile(filePath, (err, data) => {      
    // fs.readFileで直接サポートしているエンコーディング（utf8, ascii, base64 など）は直接
    // fs.readFile(filePath, 'utf8', (err, data) => { といった形で指定可能。Shift_JISは除外なので別途decodeが必要となる
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  const text = iconv.decode(data, 'Shift_JIS');
  console.log(data);    // バイナリデータのまま
  console.log(text);
});