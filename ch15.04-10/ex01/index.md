# 練習問題 15 章 15.4-10

## 問題 15.4-10.1 💻

CSS の力を体感してみよう。CSS 自体の学習はそれだけで 1 冊の本になってしまうため、この問題では ChatGPT を使って CSS を生成する (JavaScript に関してはこれまで通り出来る限り生成 AI を使わずに解答しなさい)。

[ex01](ex01) は問題 15.1-3.1 を少し改良した ToDo アプリである。

1. このアプリの見た目を変更する CSS を ChatGPT で生成させて style.css を置き換えなさい。
2. 1 で作成した CSS が何をしているか調査し、以下の例を参考に各セレクタ単位で最低 1 行のコメントを書きなさい。
   調査の際はブラウザの開発者ツール (問題 15.4-10.3 参照) を使い、各 CSS をオン・オフするとどうなるか確認すると良い。

```css
/* 幅 600px で影と丸みを付けて中央に配置 */
main {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
```

**ヒント**: ChatGPT のプロンプトの例は以下 (各自「ポケモンのピカチュウ風のデザインにして」など工夫してみなさい):

````
以下の HTML, JavaScript および CSS は ToDo アプリのソースコードです。CSS を変更して見栄えを良くしてください。

```html
{ここに index.html の内容を貼り付ける}
```

```js
{ここに index.js の内容を貼り付ける}
```

```css
{ここに style.css の内容を貼り付ける}
```
````

**参考**: プロンプトのテクニックについてより深く学びたい場合は [Prompt engineering](https://platform.openai.com/docs/guides/prompt-engineering/tactic-use-delimiters-to-clearly-indicate-distinct-parts-of-the-input) を参照。

**出題範囲**: 15.4