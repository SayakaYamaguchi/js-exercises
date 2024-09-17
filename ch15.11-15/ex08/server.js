import http from 'http';
import { WebSocketServer } from 'ws';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ESモジュールでの __dirname の代わり
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// HTTPサーバーを作成して、ファイルを提供する
const server = http.createServer((req, res) => {
  const filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not Found');
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
});

// WebSocketサーバーをHTTPサーバーにアタッチ
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('New client connected');
  
  ws.on('message', (data) => {
    const { id, requestBody } = JSON.parse(data);
    console.log(`Received request: ${requestBody}`);

    // "Hello, " を付加せずに、他のクライアントにメッセージを転送
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === ws.OPEN) {
        client.send(JSON.stringify({ id, requestBody }));
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// エラーハンドリング
wss.on('error', (err) => {
  console.error('Server error:', err);
});

// サーバーのポートを指定して起動
const port = 3003;
server.listen(port, () => {
  console.log(`HTTP server and WebSocket server are running on http://localhost:${port}`);
});
