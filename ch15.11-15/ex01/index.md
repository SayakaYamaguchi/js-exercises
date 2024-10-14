1. `contents/index.js` を変更し、上記の API を `fetch`を使って呼び出すことで、ToDo リストの状態をクライアントではなくサーバ側で管理する ToDo アプリケーションを完成させなさい。ただし index.html ファイルは編集してはいけない。サーバからエラーレスポンスが返却されたときは、ToDo リストの表示を更新させずエラーの内容を `alert` で表示する。

2. このサーバでは Cookie を使ってクライアントのセッションを識別し、タスク一覧をセッションごとに分離して管理する簡易的な認証/認可を行っている。サーバが設定している Cookie の値は `sid=<セッションに一意に割り当てた ID>; SameSite=Lax; Path=/; HttpOnly;` である。ToDo アプリでいくつかのタスクを作成した後、以下に挙げる操作を実施したとき、それぞれどのような結果になるか記載し、その理由を説明しなさい。

   - index.js で`document.cookie` プロパティを `console.log`で表示する

   - ブラウザの開発者コンソールで http://localhost:3000/ の Cookie を表示する
        sid：63449176-2828-4eab-866f-f89b85a88c42　
        domain　localhost
        Path　/
        Expires　セッション
        サイズ　39
        HttpOnly　✓

   - ToDo アプリのタブをリロードする
        http://localhost:3000/api/tasksから登録されたリスト呼び出しているので、リロード前の最後にサーバーへ送信した内容が再現される

   - 同一ブラウザの異なるタブやウィンドウで http://localhost:3000/ を開いて ToDo リストの状態を確認する
        セッションごとに異なるToDoリストを管理しており、セッションID（sid）を生成・保持している
        同一のブラウザ内の異なるタブやウィンドウでは、クッキーが共有されるため同じ内容を表示する

   - シークレットウィンドウや異なるブラウザで http://localhost:3000/ を開いて ToDo リストの状態を確認する
        サーバから呼び出しているので、ブラウザ依存の機能がなければ同じページの初期状態を表示する

   - http://127.0.0.1:3000/ を開いて ToDo リストの状態を確認する
        どちらもローカルホストでポートも同じなので、同じものを表示しているのでToDoアプリが表示される


