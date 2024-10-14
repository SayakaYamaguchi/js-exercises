import fs from 'fs';

// 元のファイルを作成し、データを書き込む
fs.writeFileSync('example.txt', 'Hello');

// ファイルを50バイトまで拡張する
fs.truncate('example.txt', 50, (err) => {
    if(err) throw err;
    console.log('ファイルが拡張されました。');

     // ファイルの内容を確認してみる
     fs.readFile('example.txt', (err, data) => {
        if (err) throw err;
        console.log('data:', data);
        console.log('data.toString:', data.toString());
        console.log('File content (each byte):', Array.from(data));
     })
})