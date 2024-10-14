## 問題 13.12 🖋️

問題 13.1 で非同期処理について学んだあなたは「時間のかかる同期関数があるならば、非同期関数に変換して適宜 `await` すればいいのではないか」と思いついた。

それでは以下のコードを実行すると何が出力されるか予想し実際に確認しなさい。
また「[マイクロタスク](https://developer.mozilla.org/ja/docs/Web/API/HTML_DOM_API/Microtask_guide)」について調査し、この用語を用いて理由を説明しなさい。

```js
setTimeout(() => console.log("Hello, world!"), 1000);

async function longRunningButAsyncFunction() {
  while (true) {
    // NOTE: ループの中で凄く時間のかかる処理 (大きい行列の処理とか...) を実行していると想像して下さい。
    // (適当な値で await するのが目的であり null に理由はない)
    await null;
  }
}

longRunningButAsyncFunction();
```

**出題範囲**: なし



setTimeout(() => console.log("Hello, world!"), 1000); // 1秒後にconsoe.logに出力

async function longRunningButAsyncFunction() {    //　await null を繰り返す
  while (true) {
    // NOTE: ループの中で凄く時間のかかる処理 (大きい行列の処理とか...) を実行していると想像して下さい。
    // (適当な値で await するのが目的であり null に理由はない)
    await null;
  }
}



longRunningButAsyncFunction();

# 実行結果
console.logは表示されず、プログラムも終了しない。

longRunningButAsyncFunction は無限ループで await null を繰り返す
マイクロタスクはJavaScript 実行スタックが空の場合にのみ実行されるが、無限ループで await nullが常にマイクロタスクキューに追加され続ける
setTimeoutはマクロタスク。マクロタスクはマイクロタスクキューが空になった後に実行される
マイクロタスクキューが空にならない為、実行の機会がない。


# マイクロタスク
マイクロタスクは、それを作成した関数やプログラムが終了した後、 JavaScript 実行スタックが空の場合にのみ実行され、ユーザーエージェントがスクリプトの実行環境を動かすために使用しているイベントループにコントロールを返す前に実行される短い関数
JavaScriptのイベントループ内で、現在のタスクが終了した直後に処理されるタスクのこと
タスクキューとは別に存在する非同期処理待ちの行列
マイクロタスクとマクロタスクが同じイベントループで処理を行われた場合マイクロタスクが優先される
イベントループで処理が回ってきたら全ての格納されているジョブを実行する

# マクロタスク
イベントループで処理が回ってきたら一つずつ格納されているタスクを実行する
setTimeout、setInterval、setImmediate（Node.jsの場合）、I/O 操作、UIイベントのコールバックなど。