環境：Apache

# 1.httpd.confを編集
C:\xampp\htdocs\conf\httpd.conf
　
<Directory～>の最後に追記しCORSを有効化
```
<Directory "C:/xampp/htdocs">
    Options Indexes FollowSymLinks
    AllowOverride None		// .htaccessファイルによる設定の上書きを許可しない
    Require all granted		// このディレクトリ内の全てのリクエストを許可

    # Enable CORS
    Header set Access-Control-Allow-Origin "*"	// どのオリジン（ドメイン）からのリクエストも許可する設定です。特定のオリジンだけを許可したい場合は、"*"の部分を特定のドメインに置き換え（例："http://example.com"）。
    Header set Access-Control-Allow-Methods "GET, POST, OPTIONS"	// 許可するHTTPメソッドを指定します。この例では、GET、POST、OPTIONSメソッドを許可
    Header set Access-Control-Allow-Headers "Origin, X-Requested-With, Content-Type, Accept"	// 許可するHTTPヘッダーを指定します。この例では、Origin、X-Requested-With、Content-Type、Acceptヘッダーを許可
</Directory>
```

headersモジュールを有効化の為コメントを削除
#LoadModule headers_module modules/mod_headers.so

# 2.Apacheを再起動

# 3.ファイルの配置
C:\xampp\htdocs\index.js
```
export function hello() {
    console.log('Hello world!');
}
```
C:\xampp\htdocs\index.html
```
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dynamic Import Test</title>
</head>
<body>
    <h1>Dynamic Import Test</h1>
    <button id="load-script">Load Script</button>
    <script type="module">
        document.getElementById('load-script').addEventListener('click', async () => {
            const module = await import('http://localhost/index.js');
            module.hello();
        });
    </script>
</body>
</html>
```

# 4.ブラウザで表示確認
http://localhost/index.html
consoleに「Hello world!」が表示
