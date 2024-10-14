## 問題 15.4-10.2 🖋️💻

昨今では CSS を 1 から自分で書くことは少なく、何らかのフレームワークを利用することが一般的である。
この問題では 2024 年現在流行している [Tailwind CSS](https://tailwindcss.com/) を利用する。

1. [Tailwind CSS](https://tailwindcss.com/) がどういったフレームワークか調べなさい。
2. [ex02](ex02) の index.html および index.js を Tailwind CSS を使うように書き換えなさい。ChatGPT を使って [ex02/README](ex02) を参考に style.css を生成しなさい (HTML, JavaScript, CSS を解答として提出すること)。

**ヒント**: ChatGPT のプロンプトの例は以下:

````
以下の HTML および JavaScript は ToDo アプリのソースコードです。
Tailwind CSS を使う前提で HTML と JavaScript のコードを書き換えて見栄えを良くして下さい。
注意: HTML と JavaScript は1つのファイルにせず分けて出力して下さい。

```html
{ここに index.html の内容を貼り付ける}
```

```js
{ここに index.js の内容を貼り付ける}
```
````

**出題範囲**: 15.4


1. [Tailwind CSS](https://tailwindcss.com/) がどういったフレームワークか調べなさい。
ウェブページの構築やデザインにおいて、マークアップの中に直接、定義済みのクラスを使用し、ビルドしcssを出力する
ユーティリティクラスを組み合わせてデザインできる

メリット：
・クラス名などを都度考える必要がない
・新しいcssファイルを作る必要がない為CSSの肥大化を防ぐ

デメリット：
・ユーティリティクラスを組み合わせるためコードの可読性が落ちやすい

比較
　CSS：マークアップの中に直接、定義済みのクラスを使用
　bootstrap：

2. [ex02](ex02) の index.html および index.js を Tailwind CSS を使うように書き換えなさい。ChatGPT を使って [ex02/README](ex02) を参考に style.css を生成しなさい (HTML, JavaScript, CSS を解答として提出すること)。
