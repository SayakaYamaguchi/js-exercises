## 問題 15.4-10.3 🖋️

ブラウザの開発者ツールを使うと CSS のデバッグを効率的に行うことができる。
[CSS のデバッグ](https://developer.mozilla.org/ja/docs/Learn/CSS/Building_blocks/Debugging_CSS) を参考にして以下を実施しなさい:

1. 15.4-10.1 および 15.4-10.2 の ToDo アプリに対してブラウザの開発者ツールから値の変更やプロパティの追加を試してみなさい

　　色の変更や、margin-topの追加など

2. 開発者ツールで CSS に関して実行できる操作を検索エンジンで調べ、便利だと思ったものを 3 つ挙げなさい

　　https://developer.chrome.com/docs/devtools/css?hl=ja
　　1.[Styles] ペインの [Box Model] ：要素のパディングをビューポートでハイライト表示する
　　2.クラスに疑似状態を追加（リンクのクリック状態などに使用）
　　　:active、:focus、:focus-within、:target、:hover、:visited、focus-visible に対応
    3.要素の書き換え

3. 15.4-10.2 のアプリの `body` 要素に対し、元々 HTML および JS 内で利用していなかった Tailwind CSS のクラス (`bg-rose-600` など何でも良い) を開発者ツールから追加すると変更が反映されないが、これは何故か調べなさい

　　ビルドしていないのが原因
　　ビルドし、使用中のクラスをcssファイルに出力しているため、ビルド前だと追加したクラスがcssに存在しない

**出題範囲**: 15.4