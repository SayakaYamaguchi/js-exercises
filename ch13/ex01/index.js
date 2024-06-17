/*
## 問題 13.1 🖋️

以下のコードを実行すると何が出力されるか予想し実際に確認しなさい。
また「[タスク](https://developer.mozilla.org/ja/docs/Web/API/HTML_DOM_API/Microtask_guide)」について調査し、この用語を用いて理由を説明しなさい。

```js
setTimeout(() => console.log("Hello, world!"), 1000);

function longRunningFunction() {
  while (true) {
    // NOTE: while (true) {} は極端な例であり、現実で見ることは少ないかもしれません。
    // しかし、時間のかかる同期処理を実行して同様の問題が発生することは実際にあります。
  }
}
longRunningFunction();
```
**出題範囲**: 13.1
*/
setTimeout(() => console.log("Hello, world!"), 1000);

function longRunningFunction() {
  while (true) {
    // NOTE: while (true) {} は極端な例であり、現実で見ることは少ないかもしれません。
    // しかし、時間のかかる同期処理を実行して同様の問題が発生することは実際にあります。
  }
}
longRunningFunction();


/*
メインスレッドはconsole.logが1000秒待機の間に、先にlongRunningFunctionを行うが
logが1000秒待機の間に、先にlongRunningFunctionを行うがのループが終わらずメインスレッドを占有するため
console.logが実行できずにconsole.log上はなにも表示されないまま

*/