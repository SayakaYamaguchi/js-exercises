## 問題 16.8 💻

GitHub の REST API を利用して Issue を操作するコマンドラインツールを実装しなさい。最低限以下の要件を満たすこと。

- 入力はコマンドライン引数から受け取る
- Issue を作成できる
- 指定した Issue をクローズできる
- オープンな Issue の Id と Title の一覧を表示できる


- `-h`または`--help`オプションで使い方が確認できる
node index.js -h    
index.js [コマンド]

コマンド:
  index.js create       Create a new issue
  index.js close        Close an existing issue
  index.js list         List all open issues
  index.js add-comment  Add a comment to an issue

オプション:
      --version  バージョンを表示                                                   [真偽]
  -o, --owner    GitHub repository owner                              [文字列] [必須]
  -r, --repo     GitHub repository name                               [文字列] [必須]
  -t, --token    GitHub personal access token                              [文字列]
  -v, --verbose  Enable verbose output                       [真偽] [デフォルト: false]
  -h, --help     ヘルプを表示                                                     [真偽]

- `-v`または`--verbose`オプションで HTTP ログを出力する

コメント追加
\n改行は不可。<br>は可

**出題範囲**: 16.1, 16.8





