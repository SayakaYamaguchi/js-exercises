## 問題 15.4-10.13 🖋️

15.4-10.11 では `#/` や `#/active` といった URL を利用した。
少し昔だとこのような URL は `#!/` や `#!/active` と `!` を付けることもあった (もしかしたら職場でそのようなコードを見るかもしれない)。
このような形式を当時は hashbang と呼んだ。どうしてこのようなスタイルが存在したのだろうか。

**参考**: [Twitter がページ表示時間を 5 分の 1 に高速化。どのようなテクニックを使ったのか？](https://www.publickey1.jp/blog/12/twitter51.html)

**出題範囲**: 15.10

ハッシュ以下は通常サーバが処理しないが
URLに"#!"が入っているとGoogleのクローラーはそのページをAjaxアプリと認識する

Ajaxを利用するために考えられたしくみ
。このしくみができた背景は、Ajax後のコンテンツをSEO（Search Engine Optimization、検索エンジン最適化）の観点からPermalinkにしたいが、一部のブラウザがURLを変更できないため、JavaScriptでフラグメントが変更できるしくみを利用しよう、という事情
Googleが「#!」を「?_escaped_fragment_=」に変換してクロール可能にする仕様を公開したため、FacebookやLifehacker.comをはじめ各所で使われるようになりました。


GoogleのJohn Mueller（ジョン・ミューラー）氏が「HTML5のpushState/replaceState」の使用を推奨（2014年）

https://qiita.com/nightyknite/items/b350dc95f7da089a516a
https://www.webopixel.net/javascript/527.html
https://gihyo.jp/dev/clip/01/orangenews/vol62/0005