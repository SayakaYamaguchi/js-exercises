// ws モジュールから WebSocket と WebSocketServer をインポートしています。
// このモジュールは、Node.js 環境で WebSocket サーバーとクライアントを簡単に構築するためのライブラリです。
import WebSocket, { WebSocketServer } from "ws";

// サーバーがリッスンするポート番号を 3003 に設定しています。
const port = 3003;

// WebSocketServer のインスタンスを作成し、指定したポート（ここでは 3003）でサーバーを起動します。
// wss は WebSocket サーバーのインスタンスを表します。
const wss = new WebSocketServer({ port });


// 他のクライアントにメッセージを転送する

// 新しいクライアントがサーバーに接続してきたときに発火するイベントハンドラーです。
// 接続された各クライアントに対して ws オブジェクトが提供されます。
wss.on("connection", (ws) => {

// 接続されたクライアントからメッセージが送信されたときに発火するイベントハンドラーです。
// 受信したデータは data として渡されます。
  ws.on("message", (data) => {

    // クライアントからのリクエストメッセージを解析
    const { requestId, requestMessage } = JSON.parse(data.toString());
    // レスポンスメッセージを作成
    const responseMessage = `Hello, ${requestMessage}`;

    // 受信したデータ (data) を文字列に変換し、message という変数に格納します。
    const message = data.toString();

    // 0から5000ミリ秒（0〜5秒）の間でランダムな整数値を生成します。
    // Math.random() は 0 以上 1 未満のランダムな数を返し、それに 1000 * 5（5000）を掛けてミリ秒単位の遅延時間を決定しています。
    // Math.floor を使って小数点以下を切り捨て、整数値にしています。
    const waitTIme = Math.floor(Math.random() * 1000 * 5);

    // 受信したメッセージと、転送時に発生する遅延時間をコンソールに出力します。
    // これにより、サーバー側でメッセージの内容と遅延時間を確認できます。
    console.log(message, `wait ${waitTIme}ms`);

    // サーバーに接続されている全てのクライアントをループ処理します。
    wss.clients.forEach((client) => {

      // client.readyState === WebSocket.OPEN
      // クライアントの接続状態が「オープン（接続中）」であることを確認します。
      // これにより、接続が確立されているクライアントにのみメッセージを送信します。

      // client != ws
      // メッセージを送信してきた元のクライアント (ws) にはメッセージを送り返さないようにします。
      // 他の全てのクライアントにのみメッセージを転送します。
      if (client.readyState === WebSocket.OPEN && client != ws) {

        // setTimeout を使用して、先ほど生成したランダムな遅延時間 (waitTIme) 後にメッセージを送信します。
        // これにより、メッセージの転送にランダムな遅延が発生します。
        setTimeout(() => {
          client.send(message);
        }, waitTIme);
      }
    });
  });
});


