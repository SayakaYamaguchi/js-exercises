/**
 * 指定された時間後に解決される Promise を返す
 * @param  {number}   msec    - 返り値の Promise を解決するまで待つ時間 (ミリ秒)
 * @return {Promise}  Promise - 指定時間後に解決される Promise
 */
function wait(msec) {
  return new Promise((resolve) => setTimeout(resolve, msec));
}

// 例: 1秒後に "A" と出力し、その2秒後に "B" と出力し、その3秒後に "C" と出力する
/*
wait(1000)
  .then(() => console.log("A"))
  .then(() => wait(2000))
  .then(() => console.log("B"))
  .then(() => wait(3000))
  .then(() => console.log("C"));
*/
  // 0, 1, 2, 3 秒待つ
const wait0 = () => wait(0);
const wait1 = () => wait(1000);
const wait2 = () => wait(2000);
const wait3 = () => wait(3000);

// ログ出力
const log = (v) => console.log(v);
const logA = (v) => console.log("A");
const logB = (v) => console.log("B");
const logC = (v) => console.log("C");

// 例外
const errX = () => {
  throw new Error("X");
};
const errY = () => {
  throw new Error("Y");
};



function f3() {
  // NOTE: then のコールバック内の例外は try/catch でキャッチできるだろうか
  // 説明：
  // C出力、0秒後にA出力、Xのthrowでエラー
  // 
  // try開始。
  // 本来はtry、catch、finallyは同期しているので順に動くがwait(0).then(logA).then(errX) が非同期処理
  // 非同期の場合は現在のスクリプトの実行が完了した後に実行となる。
  // wait(0)で0秒待機後解決
  // 非同期処理の開始後、finallyを実行で C を出力
  // プロミスを解決後errXを実行しスローしてcatchへ
  // then(errX)実行、catchへスローしXを渡す。
  // 渡されたエラーオブジェクトXを表示
  // 
  // 図解:
  // try
  //   wait(0)
  //   |------|
  //     .then(logA)
  //     |-----|
  //           rogA 
  //　　　     |-|
  //           .then(errX) 
  //　　　     |-|
  //           throw Error(X) 
  //　　　     |-|
  // catch.then
  // |-----------| 
  //             (errX)(未キャッチのエラー)
  //             |-|
  // finally
  // |-|
  //   logC
  //   |-|

  try {
    wait(0).then(logA).then(errX);
  } catch (e) {
    logB();
  } finally {
    logC();
  }
}


function f12() {
  // new Promise 内だがコールバック関数で throw した場合は？
  // new Promise 内で setTimeout が設定され、0ミリ秒後に errX が実行
  // Xをスローするがcatchに失敗。promiseの外（setTimeout内でエラー）でで発生したエラーはPromise事態ではcatchされずにエラー文を表示する
  // →非同期関数内でエラーが発生したら通常のtry/catchではキャッチできない
  // 説明：
  // new Promiseを作り即実行。
  // setTimeoutの第二引数が0なので、() => errX()を即実行。
  // catchへスローしXを渡す。
  // 
  // 図解:
  //  new Promise
  // |-----|
  //       setTimeout　0
  //       |-|
  //         errX()
  //       　|-|
  //      　　  .catch エラ＾
  //　　　      |-|
  new Promise((resolve, reject) => {
    setTimeout(() => errX(), 0);
  }).catch((e) => log(e.message));
}

  f12();

