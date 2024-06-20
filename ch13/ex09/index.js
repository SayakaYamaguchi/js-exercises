/*
## 問題 13.9 💻🧪

以下の各関数を実行すると何が出力されるか予想し実際に確認しなさい。
またその理由を 2、3 行のテキスト、図のいずれかまたは両方で説明しなさい。テキスト・図は問題 13.2 を参考にしなさい。

```js

```

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
  
async function i1() {
  // NOTE: any で1つ Promise が解決された時に他の Promise はどうなるだろうか
  // 出力：
  // 1秒後に42出力
  // 1＋2秒後に100出力
  // 
  // 説明：
  // Promise.any()は入力のプロミスのいずれかが履行されたときに、最初の履行値で履行する
  // wait1は1秒後に log(v)へ42 を返す。
  // wait2は二番目の履行となるため返さない。
  // wait1の1秒待機＋await wait2()の2秒待機後にlog(v)へ100を返す。
  // 
  // 図解:
  //  wait1
  // |-----|
  //       log(v)　42
  //       |-|
  //         wait2
  //         |----------|
  //      　　          log(v)100
  //　　　              |-|


  let v = 0;

  v = await Promise.any([
    wait1().then(() => 42),
    wait2()
      .then(() => (v = 100))
      .then(() => 0),
  ]);

  log(v);
  await wait2();
  log(v);
}
// i1();

async function i2() {
  // 出力：
  // 1秒後にC出力
  // 2秒後にB出力
  // 3秒後にA出力
  // Promise.allが解決され[ 'A', 'B', 'C' ]  出力
  // 
  // 説明：
  // Promise.any()は入力のプロミスのいずれかが履行されたときに、最初の履行値で履行する
  // wait1は1秒後に log(v)へ42 を返す。
  // wait2は二番目の履行となるため返さない。
  // wait1の1秒待機＋await wait2()の2秒待機後にlog(v)へ100を返す。
  // 
  // 図解:
  //  wait1
  // |-----|
  //       logC　C
  //       |-|
  //  wait2
  // |----------|
  //            logB　B
  //            |-|
  //  wait3
  // |---------------|
  //                 logA　A
  //                 |-|
  //                   Promise.all
  //                   |-|
  //                     log(v)　[ 'A', 'B', 'C' ]
  //                     |-|
  const v = await Promise.all([
    wait3().then(() => {
      logA();
      return "A";
    }),
    wait2().then(() => {
      logB();
      return "B";
    }),
    wait1().then(() => {
      logC();
      return "C";
    }),
  ]);
  log(v);
}
// i2();

async function i3() {
  // NOTE: all で引数の1つが失敗すると他の Promise はどうなるだろうか
  // 出力：
  // 1秒後にY 42出力
  // 2秒後にB出力
  // 3秒後に0出力
  // 
  // 説明：
  // wait1が1秒後に例外Yをスロー
  // catchのlog(e.message)によりYを出力
  // log(v)　42 を出力
  // await wait3で3秒待機
  // 2秒後にwait2のlogBからBを出力
  // 3秒後にwait3によりv = 0
  // await wait3で3秒待機後にlog(v)　0 を出力
  // 
  // 図解:
  //  wait1
  // |-----|
  //       errY
  //       |-|
  //         catch　log(e.message)Y
  //         |-|
  //       　  log(v)42
  //           |-|
  //       　    await wait3()
  //             |---------------|
  //                             log(v) 0
  //                             |-|
  //  wait2
  // |----------|
  //            logB　B
  //            |-|
  //  wait3
  // |---------------|
  //                 v = 0
  //                 |-|
  let v = 42;
  try {
    await Promise.all([
      wait3().then(() => {
        v = 0;
        errX();
      }),
      wait2().then(() => {
        logB();
        return "B";
      }),
      wait1().then(() => {
        errY();
      }),
    ]);
  } catch (e) {
    log(e.message);
    log(v);
    await wait3();
    log(v);
  }
}
// i3();

async function i4() {
  // NOTE: i5, i6 との比較用 (直列に処理を実行したいものとする)
  // 出力：
  // 5秒後に0出力
  // 9秒後に1出力
  // 12秒後に2出力
  // 14秒後に3出力
  // 15秒後に4出力
  // 15秒後にCOMPLETED出力
  // 
  // 説明：
  // i = 0 のとき、wait(5000)（5秒待機）後に log(0) が実行
  // i = 1 のとき、wait(4000)（4秒待機）後に log(1) が実行
  // i = 2 のとき、wait(3000)（3秒待機）後に log(2) が実行
  // i = 3 のとき、wait(2000)（2秒待機）後に log(3) が実行
  // i = 4 のとき、wait(1000)（1秒待機）後に log(4) が実行
  // loopを抜けたらlog("COMPLETED") が実行


  let p = Promise.resolve(null);
  for (let i = 0; i < 5; ++i) {
    p = p.then(() => wait((5 - i) * 1000).then(() => log(i)));
  }
  return p.then(() => log("COMPLETED"));
}
//i4();

async function i5() {
  // NOTE: このコードは期待通りの挙動をすると考えられるだろうか？(典型的なミス)
  // 出力：
  // 期待通りにはならない
  // COMPLETED出力
  // 5秒後に4出力
  // 9秒後に3出力
  // 12秒後に2出力
  // 14秒後に1出力

  // 説明：
  // forループが待機時間をスルーした為  
  // forを五回回してすぐにreturnでCOMPLETEDを出力
  // forの中のwait*は非同期に実行されるため、それぞれ指定時間通りに待機して実行
  // 待機時間の短いものから順にログが出力

  // 図解:
  // for
  // |-|
  //   await wait1()
  //   |-----|
  //         log(i) 4
  //         |-|
  //       　  await wait2()
  //   |----------|
  //              log(v) 3
  //              |-|
  //   await wait3()
  //   |---------------|
  //                   log(v) 2
  //                   |-|
  //   await wait4()
  //   |--------------------|
  //                        log(v) 1
  //                        |-|
  //   return　
  //   |-|
  //      log COMPLETED
  //      |-|



  let p = Promise.resolve(null);    // 解決
  for (let i = 0; i < 5; ++i) {     // 5回ループ
    // console.log('0' + i);
    p = p.then(wait((5 - i) * 1000).then(() => log(i)));  // wait*のpromiseが先に作られている為、すぐに待機が始まる

  //　成功例：then に渡される関数が呼び出されるまで wait が呼び出されないため、前の Promise が解決されるまで次の待機時間が始まらない
  //  p = p.then(() => wait((5 - i) * 1000).then(() => log(i)));  

  }
  return p.then(() => log("COMPLETED"));
}
//i5();

async function i6() {
  // 出力：
  // 1秒後に4出力
  // 2秒後に3出力
  // 3秒後に2出力
  // 4秒後に1出力
  // 5秒後に0出力
  // 5秒後にCOMPLETED出力

  // 説明：
  // Promise.allにすべてのpromiseが渡され
  // すべての待機時間が同時に開始され、最初に完了する Promise から順にログが出力される
  // 完了後.thenの log("COMPLETED"))が出力される

  // 図解:
  // Promise.all
  // |-|
  //   await wait1()
  //   |-----|
  //         log(i) 4
  //         |-|
  //       　  await wait2()
  //   |----------|
  //              log(v) 3
  //              |-|
  //   await wait3()
  //   |---------------|
  //                   log(v) 2
  //                   |-|
  //   await wait4()
  //   |--------------------|
  //                        log(v) 1
  //                        |-|
  //   　　　　　　　　　　　　.then
  //   　　　　　　　　　　　　|-|
  //      　　　　　　　　　　　 log COMPLETED
  //    　　　　　　　　　　　　 |-|
  return Promise.all(
    [0, 1, 2, 3, 4].map((i) => wait((5 - i) * 1000).then(() => log(i)))
  ).then(() => log("COMPLETED"));
}
//　i6();



async function i7() {
  // NOTE: i8 との比較用
  // 出力：
  // 11秒後に10出力

  // 説明：
  // Promise.all([p1(), p2()])によりp1（p2より1秒遅れて）とp2が平行して実行する
  // p2、p1の順にloopの数だけおなじ変数vに+1をし、それぞれ5回まわす。
  // 11秒後に合計数の11を出力
// p1:2
// p2:3
// p1:4
// p2:5
// p1:6
// p2:7
// p1:8
// p2:9
// p1:10

  let v = 0;

  // 1秒待った後に2秒間隔で value の値を更新
  const p1 = async () => {
    await wait1();
    for (let i = 0; i < 5; i++) {
      const next = v + 1;
      v = next;
//      console.log('p1:'+v);
      await wait2();
    }
  };

  // 2秒間隔で value の値を更新
  const p2 = async () => {
    for (let i = 0; i < 5; i++) {
      const next = v + 1;
      v = next;
  //    console.log('p2:'+v);
      await wait2();
    }
  };

  await Promise.all([p1(), p2()]);
  log(v);
}
//　i7();

async function i8() {
  // NOTE: 複数の非同期処理が1つの変数に対し書き込みを行う場合、読み込みと書き込みの間に await が入るとどうなるだろうか
  // 出力：
  // 11秒後に5出力

  // 説明：
    // p1 と p2 が並行して実行されるため、p2 の結果が先に反映される可能性が高く、最終的な v は 5 になる
    // await wait2() の後に v = next が行われるため変数 v に対して並行して書き込みを行う際に、値が更新される順序の影響で最終的な値が異なる
    // 加算後に待機するのではなく、待機後に加算が行われるため、v の値が正しく加算されずに上書きされてしまう
  // 11秒後に合計数の11を出力
// p1:2
// p2:3
// p1:4
// p2:5
// p1:6
// p2:7
// p1:8
// p2:9
// p1:10

let v = 0;

  const p1 = async () => {
    
    await wait1();
    for (let i = 0; i < 5; i++) {
      // NOTE: value の読み込み (value + 1) と書き込み (value = ...) の間に await が...

      const next = v + 1;
      await wait2();
      console.log('p1:'+v);
      console.log('p1:'+next);
      v = next;
    }
  };

  const p2 = async () => {
    for (let i = 0; i < 5; i++) {
      const next = v + 1;
      await wait2();
      console.log('p2:'+v);
      console.log('p2:'+next);
      v = next;
    }
  };

  await Promise.all([p1(), p2()]);
  log(v);
}
i8();