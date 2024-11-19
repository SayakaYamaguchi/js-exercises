## 問題 17.7 🖋

TypeScriptのトランスパイルは`@babel/preset-typescript`や`tsc`によって可能だが、それぞれの違いを調べなさい。
**出題範囲 17.6**

# tsc

TypeScriptの開発チームが提供しているTypeScriptのトランスパイラ
tsconfig.json の target オプションで古いJavaScriptへのトランスパイルをサポート

〇 TypeScriptの開発チームが提供しているため、TypeScriptの仕様に完全準拠
△ tscのトランスパイル対象となるのは JavaScriptの構文だけ。Promiseなどの組み込みオブジェクトは構文でないため、tscのトランスパイル対象から外れる
△ Babelと比較するとコンパイル速度が遅い

→TypeScriptの全機能を利用する
→ビルド速度より堅牢性、型チェックを優先

# Babel

ES2020などの最新のJavaScriptコードをIE11などのブラウザでも動作するJavaScriptコードに変換するトランパイラー

〇 コンパイルにかかる時間が高速
〇 多くのプラグインがあり、最新のECMAScript構文やJSXなどにも対応
〇 複数のPluginsを使用できるため柔軟な設定が可能
△ 型チェックを行わない→別途ツール（tsc --noEmit や ESLint）で行う構成にしてカバーできる
△ TypeScriptの一部機能がサポート外（名前空間　namespaceなど）

→型チェックとトランスパイルを一貫して行いたい
→TypeScriptの全機能を利用したい
→ビルド速度よりも堅牢性や型チェックを優先する
