
## 問題 13.2 🖋️

以下の各関数 `f3` から `f12` までを実行すると何が出力されるか予想し実際に確認しなさい。
またその理由を 2、3 行のテキスト、図のいずれかまたは両方で説明しなさい。テキスト・図は f1 の解答例を参考にしなさい。

```js
function f1() {
  // NOTE: f2 との比較用 (注: () => wait(...) は () => { return wait(...); } と同じことに注意
  //
  // 回答:
  // 3秒後に A が出力され、その2秒後に B が出力され、その1秒後に C が出力される。
  //
  // 説明:
  // wait3 の解決後に logA が実行され、wait2().then(logB) の解決後 (2秒後に B 出力) に wait1().then(logC) が実行されるため。
  //
  // 図解:
  //  wait3
  // |---------------|
  //                  logA
  //                 |-|
  //                    wait2
  //                   |----------|
  //                               logB
  //                              |-|
  //                                 wait1
  //                                |-----|
  //                                       logC
  //                                      |-|
  wait3()
    .then(logA)
    .then(() => wait2().then(logB))
    .then(() => wait1().then(logC));
}

function f2() {
  // NOTE: 2つ目の then の中で return が無くなっていることに注意 (典型的なミス)
  //
  // 解答例:
  // 3秒後に A が出力され、その1秒後に C が出力され、その1秒後に B が出力される。
  // 2つ目の .then のコールバック関数が値を return していないため、この .then が返す Promise は即解決される。
  // このため logA() の実行すぐ後に wait1().then(...) が実行され C が先に出力される。
  //
  // 図解:
  //  wait3
  // |---------------|
  //                  logA
  //                 |-|
  //                    wait2
  //                   |----------|
  //                               logB
  //                              |-|
  //                  wait1
  //                 |-----|
  //                        logC
  //                       |-|
  wait3()
    .then(logA)
    .then(() => {
      wait2().then(logB);
    })
    .then(() => wait1().then(logC));
}

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

function f4() {
  // NOTE: f5 との比較用
  // 
  // 解答:
  // 2秒後に A が出力され、その1秒後に B が出力され、その後 100 が出力される。
  // 
  // 説明：
  // wait2 の解決後に logA が実行され、その後1秒後に logB が実行され 100 を返し、次の .then で 100 が出力される。
  // 
  // 図解:
  //  wait2
  // |----------|
  //            logA
  //            |-|
  //              wait(1000)
  //              |----------|
  //                         logB
  //                         |-|
  //                           logV
  //　                         |-|  wait2()
  wait2()
    .then(() => {
      logA();
      return 40;
    })
    .then((value) =>
      wait(1000).then(() => {
        logB();
        return 100;
      })
    )
    .then((v) => log(v));
}

function f5() {
  // NOTE: 2つ目の then の引数が関数でなく Promise になっている (典型的なミス)
  // 
  // 解答:
  // 1秒後に B が出力され、その2秒後に A が出力され、その後 40 が出力される。
  // 
  // 説明：
  // wait2 の解決後に一つ目の.thenより logA が実行され40を返す。
  // 次の.thenには関数ではなくpromise wait1().then(() => {logB();return 100;})　が渡されるため、一つ目のthenは待たないず、次のthenに引継ぎもされない
  // wait1() で1秒後に logB が実行され 100 を返し、一つ目の .then のretrunを引継ぎ 40 が出力される。
  // 
  // 図解:
  //  wait2
  // |----------|
  //            logA(40)
  //            |-|
  // wait(1000)
  // |-----|
  //       logB
  //       |-|
  //              logV
  //　            |-|  wait2()
    .then(() => {
      logA();
      return 40;
    })
    .then(
      wait1().then(() => {
        logB();
        return 100;
      })
    )
    .then((v) => log(v));
}

function f6() {
  // NOTE: 1つの Promise に対し then を2回呼び出すとどうなるか
  // 解答:
  // 1秒後に A が出力され、Aが出力した1秒後に B が出力され、Aが出力した2秒後に C が出力される。
  // 
  // 説明：
  // wait1 の解決後に一つ目の.thenより logA が実行。
  // logA実行後にp.thenのwait1()と wait2()が非同期の為同時に待機。logA実行後1秒後にwait1の待機が終わりlogBを実行、
  // logA実行後2秒後にlogC実行
  // 
  // 図解:
  //  wait1
  // |-----|
  //       logA
  //       |-|
  //          wait1
  //          |-----|
  //                logB
  //                |-|
  //          wait2
  //          |----------|
  //      　　　          logC
  //　　　                |-|
  const p = wait1().then(logA);
  p.then(() => wait1()).then(logB);
  p.then(() => wait2()).then(logC);
}

function f7() {
  // NOTE: 2つ目の wait の引数が実行される差には p は解決済み
  // (= 解決済みの Promise の then を呼び出すとどうなるか)
  // 解答:
  // 1秒後に A が出力され、wait1が解決した2秒後に B が出力され、C が出力される。
  // 説明：
  // wait1 で1秒待機、解決後に logA実行 と wait2 で2秒待機
  // wait2 2秒待機後にpは解決済みなのでp.then(logB)を即実行。
  // logも実行後 logC を表示。
  // 
  // 図解:
  //  wait1
  // |-----|
  //       logA
  //       |-|
  //       wait2
  //       |----------|
  //                　logB
  //                　|-|
  //      　　　        logC
  //　　　              |-|  const p = wait1().then(logA);
  wait2()
    .then(() => {
      return p.then(logB);
    })
    .then(logC);
}

function f8() {
  // NOTE: f9, f10 との比較用
  // 説明：
  // 1秒後にX を表示、即 logA を表示
  // 
  // wait1 で1秒待機後に errX を実行。throwでcatchブロックにエラーを渡す。.then(errY)は実行しない
  // catch を実行。渡された X をconsoleで表示
  // catch実行後、finallyを実行でlogAを表示
  // 
  // 図解:
  //  wait1
  // |-----|
  //       errX
  //       |-|
  //         catch
  //       　|-|
  //      　　　finally
  //　　　      |-|
  //      　　　  logA
  //　　　        |-|
    .then(errX)
    .then(errY)
    .catch((e) => log(e.message))
    .finally(logA);
}

function f9() {
  // NOTE: f12 との比較用
  // 説明：
  // 1秒後にYを表示、logA表示
  // wait1を1秒後に解決し,thenブロックが42を返す。
  // 次のthenでerrYをスローしYを送る
  // catchを実行　渡されたYを表示
  // finallyを実行しAを表示
  // 
  // 図解:
  //  wait1
  // |-----|
  //       then　42
  //       |-|
  //         errY
  //       　|-|
  //      　　  catch
  //　　　      |-|
  //      　　  　Y
  //　　　        |-|
  //      　　　    finally
  //　　　          |-|
  //      　　　      logA
  //　　　            |-|
  wait1()
    .then(() => 42)
    .then(errY)
    .catch((e) => log(e.message))
    .finally(logA);
}

function f10() {
  // NOTE: then(r, c) と then(r).catch(c) は等しいか？
  // then(r, c)　　　　 特定の .then で発生したエラーのみを処理する
  // then(r).catch(c)　 前の全ての .then チェーンで発生したエラーを処理する

  // 説明：
  // wait1を1秒後に解決し,thenブロックが42を返す。
  // 次のthenでerrYをスローしYを送る。エラーなので第二引数 (e) => log(e.message) は無視
  // catchがないためfinallyにを実行しAを表示
  // 
  // 図解:
  //  wait1
  // |-----|
  //       then　42
  //       |-|
  //         errY
  //       　|-|
  //           Y
  //       　  |-|
  //      　　  　finally
  //　　　        |-|
  //      　　　    logA
  //　　　          |-|
  wait1()
    .then(() => 42)
    .then(errY, (e) => log(e.message))
    .finally(logA);
}

function f11() {
  // f12 との比較用: new Promise 内の throw は .catch でキャッチできるか？
  // 説明：
  // new Promiseを作り即実行。promise内のerrXを呼び出しエラーをスローしcatchへ
  // 渡されたエラーオブジェクトXを表示
  // 
  // 図解:
  //  new Promise
  // |-----|
  //       errX()
  //       |-|
  //         throw Error(X)
  //       　|-|
  //      　　  .catch 
  //　　　      |-|
  //      　　  　e.message X
  //　　　        |-|

  new Promise((resolve, reject) => {
    errX();
  }).catch((e) => log(e.message));
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
  //      　　  .catch エラー
  //　　　      |-|
  new Promise((resolve, reject) => {
    setTimeout(() => errX(), 0);
  }).catch((e) => log(e.message));
}
```

**出題範囲**: 13.2