/*

## 問題 13.7 🖋️

以下の各関数を実行すると何が出力されるか予想し実際に確認しなさい。
またその理由を 2、3 行のテキスト、図のいずれかまたは両方で説明しなさい。テキスト・図は問題 13.2 を参考にしなさい。



**出題範囲**: 13.3
*/
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

async function h1() {
  // wait3 3秒待機しlogA実行でAを出力
  // wait2 最初の3秒＋2秒待機しlogB実行でBを出力
  // wait1 最初の3秒＋2秒＋1秒待機しlogC実行でCを出力

  // wait関数で指定されたミリ秒数だけ待機するPromiseを返し、チェーンメソッドで順次実行

  try {
    await wait3();
    logA();
    await wait2();
    logB();
    await wait1();
    logC();
  } catch (e) {
    log(e.message);
  }
}

function h2() {
  // NOTE: h3 との比較用
  new Promise(() => {
    errX();
  }).catch((e) => log(e.message));
}

function h3() {
  // NOTE: new Promise の引数が async function の場合、例外はどう扱われるだろう
  new Promise(async () => {
    errX();
  }).catch((e) => log(e.message));
}

async function h4() {
  // NOTE: 2つの例外は両方 catch できるか？
  try {
    const p1 = wait2().then(() => {
      errX();
    });
    const p2 = wait1().then(() => {
      errY();
    });
    await p1;
    await p2;
  } catch (e) {
    log(e.message);
  }
}

// h1();
// h2();
// h3();
  h4();
