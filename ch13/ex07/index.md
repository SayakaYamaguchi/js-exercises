  // 
  // ABC
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


# h1
  説明：
  // wait3で3秒待機しlogA実行でAを出力
  // wait2で最初の3秒＋2秒待機しlogB実行でBを出力
  // wait1で最初の3秒＋2秒＋1秒待機しlogC実行でCを出力
  // wait関数で指定されたミリ秒数だけ待機するPromiseを返し、チェーンメソッドで順次実行


# h2
  // NOTE: h3 との比較用
  説明：
  // newPromise内でerrXを実行、例外エラーとしてcatchへXを出力
  // wait関数で指定されたミリ秒数だけ待機するPromiseを返し、チェーンメソッドで順次実行

# h3
  // NOTE: new Promise の引数が async function の場合、例外はどう扱われるだろう
  説明：
  // newPromiseの引数にasyncを使用。
  // async関数内でerrXを実行し例外エラーを発生
  // Promise解決前にthrowする為、catchへ到達できずにエラーとなる

# h4
  // NOTE: 2つの例外は両方 catch できるか？
  説明：
  // p1 wait2を呼び出し2秒待機しerrX作成
  // p2 wait1を呼び出し1秒待機しerrY作成
  // p2のほうが早く終わるのでerrYをcatchへ投げるが最初のエラーのみを受け取る

  // try
  //   wait2
  //   |------------|
  //   　　　        .then(errX) 
  //　　　   　　　  |-|
  //   wait1
  //   |------|
  //   　　　 .then(errY) 
  //　　　    |-|
  //　           throw Error(X) 
  //             |-|
  //　             (errX)(未キャッチのエラー)
  //  　           |-|
