## 問題 1.4 🖋️

以下の内容を index.html に保存し、Web ブラウザで開きなさい。
開発者ツール (Chrome の場合 F12) のコンソール上に何が表示されるか予想し、結果が一致するか確認しなさい。
開発者ツールを開いた状態のタブで HTML を開く場合と、HTML を開いた状態のタブで開発者ツールを開く場合とで、結果を比較しなさい。
また、常に期待した結果を得るためにはどのようにコードを修正すべきか答えなさい。

```html
<!DOCTYPE html>
<html>
  <body>
    <script>
      let life = { answer: 42 };
      console.log(life);
      life.answer = 0;
      console.log(life);
    </script>
  </body>
</html>
```

**出題範囲**: なし

**回答予測**
初回は42を出力
life.answer = 0;で0を代入している為二回目は0を表示する

**結果比較**
開発者ツールを開いた状態のタブで HTML を開く場合:初回42,二回目0
HTML を開いた状態のタブで開発者ツールを開く場合:初回0,二回目0

開発者ツールを後から開いた場合、スクリプトが実行済みの為二回とも0に
最初から開発者ツールを開いていた場合はconsole.logの実行の度にその時点でのlifeを表示するため0の代入前後の数字が表示される

**修正方法**
正解：数字を文字列にコピーしておくと変わらない




NG---

初回のconsole.logの実行タイミングを、開発者ツールが表示されているかどうかではなく常に同じタイミングにする。

let lifeの宣言だけを最初にしておき、残りの代入は処理は
Promiseのthen()メソッドを使って、42を代入、console.log表示、0を代入、console.logを表示と順番に実行させる。

```js
  let life = {};
  
  Promise.resolve()
  .then(function(){
      return new Promise(function (resolve, reject) {
          setTimeout(function() {
              life.answer = 42;
              resolve(life);
          }, 3000);
      });
  })
  .then(function(value){
      return new Promise(function (resolve, reject) {
          setTimeout(function() {
              console.log(value); // => {answer: 42}
              life.answer = 0;
              resolve(life);
          }, 3000);
      });
  })
  .then(function(value){ // resolveで渡された値の受け取り  => {answer: 0}
      return new Promise(function (resolve, reject) {
          console.log(value); // => {answer: 0}
          resolve();
      });
  });
```
