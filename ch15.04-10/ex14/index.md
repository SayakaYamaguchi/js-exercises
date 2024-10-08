## 問題 15.4-10.13 🖋️

15.4-10.11 では `#/` や `#/active` といった URL を利用した。
少し昔だとこのような URL は `#!/` や `#!/active` と `!` を付けることもあった (もしかしたら職場でそのようなコードを見るかもしれない)。
このような形式を当時は hashbang と呼んだ。どうしてこのようなスタイルが存在したのだろうか。

**参考**: [Twitter がページ表示時間を 5 分の 1 に高速化。どのようなテクニックを使ったのか？](https://www.publickey1.jp/blog/12/twitter51.html)

問題:

- ブラウザの開発者ツールの「ネットワーク」タブを確認してみよう。リンクをクリックしたときに通信は発生しているだろうか？
ネットワークタブの表示
bar?_rsc=163xj
foo?_rsc=j6y5i

初回のみそれぞれ表示され、二回目以降は表示がなかった
初回だけ通信が発生し、その後のページ遷移ではサーバーとの新たな通信が行われていない

Next.jsが各ページのHTMLをクライアント側のJavaScriptで生成するのではなく、あらかじめサーバーサイドで生成しておくこと
通常のHTTPリクエストのページ全体のリロードではなく、パフォーマンスの最適化のための特定のコンポーネントやデータを取得するためのリクエスト


- pushState はいつ実行されているだろうか？
クリック直後


- 15.4-10.12 では pushState を使った実装でページのリロード時に正しく動作しなかったが、この問題ではどうだろうか？

エラーがでた
app-index.js:33 Warning: Extra attributes from the server: cz-shortcut-listen
サーバが生成したhtmlとクライアントで再レンダリングしたhtmlが位置しない場合にでる警告
cz-shortcut-listenという属性がクライアント側のみに追加された為にエラーがでた（拡張機能が原因）
UIの不具合などが発生する可能性があるため、サーバとクライアントでのレンダリングが一致するよう、動的に挿入される属性やクライアントのみで追加される属性がないかの確認が必要



この問題を通して「昨今のフレームワークはリンク (通常は `<a>` タグを利用) ですら内部で複雑なことを実施している」ことが伝われば幸いである (もしかしたらトラブル時に知っておくと助けになるかもしれない)。余談だが [Next.js App Router と控えめにお付き合いして普通の Web アプリを配信する](https://zenn.dev/overflow_offers/articles/20240112-using-nextjs-app-router-sparingly) のように `<Link>` を使わないスタイルも存在する。

**出題範囲**: 15.10
