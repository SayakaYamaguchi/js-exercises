## 問題 17.10 🖋

TypeScriptとFlowについて、どちらが主流となっているかを調べなさい。
また、その理由を考えてまとめなさい。

**出題範囲 17.8**
typeScriptが主流

- 「Flow　typeScript」でGoggle検索すると圧倒的にFlow→typeScriptへの乗り換えの記事が多い
- Qiita記事検索結果
  > FlowType　274件,
  > Flow　9,676件,
  > typeScript　27,295件
- JavaScriptのトランスコンパイラであるBabelは、2022年7月23日にソースコードをFlowからTypeScriptへ完全に移行（2020年開始）

理由：

- 開発者コミュニティが活発
- VScodeなどの主なIDEでサポートされている
- Anglar、React、Vueなどの主要なフレームワークが公式にサポート
- Nodeといったサーバーサイド環境でも広く利用されている
- FlowからTypeScriptへの移行を容易にするツールがある
- JavaScriptとの互換性が高く、Flowから移行の際の学習コストが低い
- Flowを開発したMeta社がTypeScriptを採用始めた為、Flowの更新頻度が低下
