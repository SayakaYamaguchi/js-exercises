import WebSocket, { WebSocketServer } from "ws";

const port = 3003;
const wss = new WebSocketServer({ port });

// 他のクライアントにメッセージを転送する
wss.on("connection", (ws) => {
  ws.on("message", (data) => {
    // クライアントからのメッセージをJSONとしてパースする
    const { requestId, requestMessage } = JSON.parse(data.toString());

    // レスポンスメッセージを作成
    const responseMessage = `Hello, ${requestMessage}`;
    
//    const message = data.toString();
    // ランダムな遅延を生成 (0〜5秒)
    const waitTime = Math.floor(Math.random() * 1000 * 5);
    console.log(`Received: ${requestMessage}, responding in ${waitTime}ms`);
//    console.log(message, `wait ${waitTIme}ms`);

    // 接続中の他のクライアントにメッセージを転送する
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN && client != ws) {
        // リクエストを送ってきたクライアントにもレスポンスを返す
        setTimeout(() => {
          client.send(JSON.stringify({ requestId, responseMessage }));
//          client.send(message);
        }, waitTime);
      }
    });
    // リクエストを送ってきたクライアントにもレスポンスを返す
    setTimeout(() => {
      ws.send(JSON.stringify({ requestId, responseMessage }));
    }, waitTime);
  });
});
