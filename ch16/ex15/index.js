import { Worker, isMainThread, parentPort } from 'worker_threads';

if (isMainThread) {
  // num を number 型の変数として定義
  let num = 0;
  let worker = new Worker(new URL(import.meta.url)); // ESモジュール形式でワーカーを作成

  worker.on("online", () => {
    // サブスレッドからのメッセージ（インクリメントの指示）を受け取る
    worker.on("message", (message) => {
      if (message === "increment") {
        // num をインクリメント
        num++;
      } else if (message === "done") {
        // サブスレッドが終了した後に、合計を出力
        console.log(num);  // 期待通りの 10,000,000 となるはず
      }
    });

    // メインスレッドで 10,000,000 回インクリメント
    for (let i = 0; i < 10_000_000; i++) {
      num++;
    }

    // メインスレッドの処理が終わった後、サブスレッドに終了メッセージを送信
    worker.postMessage("done");
  });
} else {
  // サブスレッド側の処理
  for (let i = 0; i < 10_000_000; i++) {
    // メインスレッドに "increment" のメッセージを送信
    parentPort.postMessage("increment");
  }
  // 全ての処理が終了したら、メインスレッドに "done" のメッセージを送信
  parentPort.postMessage("done");
}