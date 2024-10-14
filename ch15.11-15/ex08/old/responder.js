// WebSocketをwsモジュールからインポート
import WebSocket from 'ws';

let wsResponder = null;

// WebSocketレスポンダーを接続
function connectResponderWebSocket() {
  wsResponder = new WebSocket('ws://localhost:3003'); // WebSocketサーバーに接続

  wsResponder.on('open', () => {
    console.log('Responder connected to WebSocket server');
  });

  // サーバーからリクエストを受信
  wsResponder.on('message', (data) => {
    const { id, requestBody } = JSON.parse(data);
    console.log(`Received request: ${requestBody}`);

    // リクエスト本文の先頭に "Hello, " を付加したレスポンスを作成
    const responseBody = `Hello, ${requestBody}`;
    const responseMessage = JSON.stringify({ id, responseBody });

    // サーバーにレスポンスを返送
    wsResponder.send(responseMessage);
    console.log(`Sent response: ${responseBody}`);
  });

  wsResponder.on('close', () => {
    console.log('Responder WebSocket connection closed');
  });

  wsResponder.on('error', (error) => {
    console.error('Responder WebSocket error:', error);
  });
}

// WebSocket接続を開始
connectResponderWebSocket();
