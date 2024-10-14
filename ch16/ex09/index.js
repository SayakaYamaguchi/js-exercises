
const express = require('express');
const fs = require('fs');
const path = require('path');

// ルートディレクトリの指定
const rootDirectory = process.argv[2] || '/tmp';
const port = parseInt(process.argv[3]) || 8000;

// Expressアプリケーションの作成
const app = express();

// JSONのパースを行うミドルウェアを追加
app.use(express.json());

// 静的ファイルの提供
app.use(express.static(rootDirectory));

// /test/mirror エンドポイントの実装
app.all('/test/mirror', (req, res) => {
  res.set('Content-Type', 'text/plain; charset=UTF-8');
  res.write(`${req.method} ${req.url} HTTP/${req.httpVersion}\r\n`);
  
  for (const header in req.headers) {
    res.write(`${header}: ${req.headers[header]}\r\n`);
  }
  
  res.write('\r\n');
  req.pipe(res); // リクエストボディをそのままレスポンスに返す
});

// 404エラーハンドリング (存在しないファイルへのリクエスト)
app.use((req, res, next) => {
  const filename = path.join(rootDirectory, req.path);

  // ファイルが存在しない場合の処理
  fs.access(filename, fs.constants.F_OK, (err) => {
    if (err) {
      res.status(404).send('File not found');
    } else {
      next();
    }
  });
});


// サーバーの起動
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}

module.exports = app;
