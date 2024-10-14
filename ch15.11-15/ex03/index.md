## 問題 15.11-15.3 💻

この問題では、[問題 15.11-15.1](#問題-1511-151-️) と同様な仕様のサーバが用意してある。
ただし、このサーバは、3000 ポートで HTML や js などのコンテンツを返すが、HTTP API は 3001 ポートで Listen している。

まず、[問題 15.11-15.1](#問題-1511-151-️) で作成した `contents/index.js` を変更して、`fetch` で `http://localhost:3001/<各 API のパス>` にリクエストを送るように変更しなさい。

上記の変更をした後、開発者コンソールを開いて、http://localhost:3000 にアクセスして見ると、HTTP API のリクエストに対してエラーが発生しているはずである。

エラーは、API の URL に対して `OPTIONS` メソッドのリクエストを送り、レスポンスが 404 のため発生している。
このリクエストは [Preflight リクエスト](https://developer.mozilla.org/ja/docs/Glossary/Preflight_request) と呼ばれるものであり、サーバーが CORS プロトコルに対応しているか確認するためのものである。
その結果、コンソールには CORS のエラーが発生した旨のログが出力されているはずである。

(補足: クロスオリジンリクエストでも、[必ず Preflight リクエストが発生するわけではない](https://developer.mozilla.org/ja/docs/Web/HTTP/CORS#%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B9%E5%88%B6%E5%BE%A1%E3%82%B7%E3%83%8A%E3%83%AA%E3%82%AA%E3%81%AE%E4%BE%8B))

では、以下の変更を行うことで、 CORS エラーを解消し http://localhost:3000 から http://localhost:3001 の API にリクエストを送信できるようにしなさい。

- `contents/index.js` で、`fetch` のオプション設定を変更し、CORS モードでのリクエスト送信と、クロスオリジンでの Cookie の送信を許可する
- `server.js` で以下の箇所を変更して、`http://localhost:3000` からのクロスオリジンリクエストを許可する

  ```js
  // CORS のヘッダを返すミドルウェア
  function corsMiddleware(_url, _req, res) {
    // TODO: CORS に必要なヘッダを複数設定する
    res.setHeader("TODO", "TODO");
    return true;
  }
  ```

  ```js
  http
    .createServer(async function (req, res) {
      await routes(
        // TODO: この行のコメントを外す
        // ["OPTIONS", "/api/*", nopHandler, cors],
        ["GET", "/api/tasks", listTasksHandler, authz, cors],
        ["GET", "/api/tasks/{id}", getTaskHandler, authz, cors],
        ["POST", "/api/tasks", createTaskHandler, authz, cors],
        ["PATCH", "/api/tasks/{id}", patchTaskHandler, authz, cors],
        ["DELETE", "/api/tasks/{id}", deleteTaskHandler, authz, cors],
      )(req, res);
    })
    .listen(3001);
  ```

**出題範囲: 15.1.8.2, 15.11.1.8**