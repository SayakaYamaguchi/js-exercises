import http from 'http';
import { parse } from 'querystring';

// HTMLフォーム
const formHTML = `<!doctype html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Greeting Form</title>
  </head>
  <body>
    <form action="/greeting" method="POST">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" />
      <label for="greeting">Greeting:</label>
      <input type="text" id="greeting" name="greeting" />
      <button type="submit">Submit</button>
    </form>
  </body>
</html>`;

// サーバー作成
const server = http.createServer((req, res) => {
  const { method, url } = req;

  // "/" への GET リクエストを処理
  if (url === '/' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(formHTML);

  // "/greeting" への POST リクエストを処理
  } else if (url === '/greeting' && method === 'POST') {
    let body = '';

    // データを受け取る
    req.on('data', chunk => {
      body += chunk.toString();
    });

    // データ受信完了後の処理
    req.on('end', () => {
      const parsedData = parse(body);
      const { name, greeting } = parsedData;

      // name と greeting を含む HTML レスポンス
      const responseHTML = `
      <!doctype html>
      <html lang="ja">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Greeting Response</title>
        </head>
        <body>
          <h1>Greeting Received</h1>
          <p>Name: ${name || 'Unknown'}</p>
          <p>Greeting: ${greeting || 'No greeting'}</p>
        </body>
      </html>`;

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(responseHTML);
    });

  // その他のリクエストには 404 または 405 エラーを返す
  } else {
    if (method !== 'GET' && method !== 'POST') {
      res.writeHead(405, { 'Content-Type': 'text/plain' });
      res.end('405 Method Not Allowed');
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    }
  }
});

// サーバーをポート8080で起動
server.listen(8080, () => {
  console.log('Server running at http://localhost:8080/');
});
