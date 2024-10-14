## 問題 10.1 🖋️💻

以下のページに対応する sets.cjs、stats.cjs、index.cjs を書き写して作成し、それらを Webpack で mode を none、developemnt、production のそれぞれでバンドルし、各結果が、p.276 の上のコードに対してどの様な差異があるかを、それぞれ 1 行程度で記述しなさい。

| ページ                                    | ファイル名 |
| :---------------------------------------- | :--------- |
| p.266-271 (BitSet の export の追記が必要) | sets.cjs   |
| p.277                                     | stats.cjs  |
| p.276 の下                                | index.cjs  |

なお、Webpack での各 mode でのバンドルは package.json のあるディレクトリで以下の手順で実行できます。

```sh
npm i -D webpack webpack-cli # Webpackインストール
# 以下それぞれ ./ch10/ex01/dist/main.jsが出力されるcd
npx webpack --mode=none ./ch10/ex01/index.cjs -o ./ch10/ex01/dist
npx webpack --mode=development ./ch10/ex01/index.cjs -o ./ch10/ex01/dist
npx webpack --mode=production ./ch10/ex01/index.cjs -o ./ch10/ex01/dist
```

**出題範囲**: 10.1 10.2


* none
　

* development
　eval関数内実際に実行するコードが入る
　バンドルされたコードと元のソースコードの対応関係などを記述している為、デバッグやエラー追跡が可能
* production
 　圧縮し不要な個所は削除し最小化する。パフォーマンスが最適化されており本番環境向け

