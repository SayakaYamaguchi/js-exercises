## 問題 16.11 💻🧪🖋️

ブラウザと以下の通信ができる HTTP サーバを net パッケージのみを用いて実装しなさい。

1. "/"が GET されたとき以下の HTML を返却する
```html
   <!doctype html>
   <html lang="ja">
     <head>
       <meta charset="UTF-8" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>Greeting Form</title>
     </head>
     <body>
       <form action="/greeting" method="POST">
         <label for="greeting">Name:</label>
         <input type="text" id="name" name="name" />
         <input type="text" id="greeting" name="greeting" />
         <button type="submit">Submit</button>
       </form>
     </body>
   </html>
```
2. 1.のフォームから`/greeting`に POST されたとき、nameとgreeting の内容をボディに含む HTML を返却する
3. 1.2.3.で非対応のパスとメソッドの組み合わせでアクセスされた場合、HTTP のプロトコルにしたがい 404 または 405 を返す

また、複数のTCPクライアント (net.Socket) でHTTPリクエストを送信せず同時に接続を維持した際、何接続で接続が確立できなくなるか確認し、確立できなかった理由を書きなさい。


**出題範囲: 16.11.9**
