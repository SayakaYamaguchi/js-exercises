/*
## 問題 11.16 💻🧪
以下の仕様を持つ、 `retryWithExponentialBackof` 関数を実装しなさい
```js
function retryWithExponentialBackoff(func, maxRetry, callback)
```
- 受け取った関数 `func` を呼び出し、funcがtrueを返せばそこで終了する
- `func` が `false` を返した場合は以下の待ち時間後に `func` 呼び出しをリトライする
- 待ち時間は`func`の呼び出し回数に応じて1秒, 2秒, 4秒, ...と2倍に増えていく
- `maxRetry` 回リトライしても成功しない場合はそこで終了する
- `retryWithExponentialBackoff`に対する呼び出しは即座に完了し、`func` の呼び出しは非同期に行われる
- `func` が `true` を返す、またはmaxRetry回のリトライが失敗し終了する際、その結果(`true`/`false`)を引数として関数 `callback` が呼び出される

**出題範囲**: 11.10
*/


export function retryWithExponentialBackoff(func, maxRetry, callback) {
    let attempt = 0;

    function executeFunction() {
        try {
            if (func()) {
                callback(true);
            } else {
                retry();
            }
        } catch (error) {
            retry();
        }
    }

    function retry() {
        attempt++;
        if (attempt <= maxRetry) {
            const delay = Math.pow(2, attempt - 1) * 1000; // attemptは1から始まるので、attempt - 1で待ち時間を計算
            setTimeout(executeFunction, delay);
        } else {
            callback(false);
            // setTimeout(() => callback(false), Math.pow(2, attempt - 1) * 1000);
        }
    }

    executeFunction();
}
/*
    function attempt(retryCount) {
        setTimeout(() => {
            try{
                const result = func();                          // func を実行して結果を取得
                if (result === true) {                          // func が true or 最大リトライ回数に達した
                    callback(true);                             // コールバックを呼び出す
                } else {                                        // func が falseの場合
                    if(retryCount < maxRetry){                  // リトライ回数がmaxRetry未満の場合
                        attempt(retryCount + 1);                // 実行回数（attempt）に＋1カウントし再帰的に次のリトライを実行
                    }else{
                        callback(false);                        // リトライ回数がmaxRetryに達したらcallbackを呼び出し引数をfalseにして終了
                    }
                }
            } catch (error){
                if(retryCount < maxRetry){
                    attempt(retryCount + 1);
                }else{
                    callback(false);
                }
            }
        },Math.pow(2, retryCount) * 1000);                      // Math.pow(底, 指数)
    }
    attempt(1); // 初回リトライ
    */


