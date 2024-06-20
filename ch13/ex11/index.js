/**
 * ## 問題 13.11 💻🧪

11 章の演習問題で作成した `retryWithExponentialBackoff` に対して `Promise` を返すように実装を変更しなさい。
引数の `func` は `Promise` を返す関数とし、`func` の返り値が成功した場合は `retryWithExponentialBackoff` の返り値をその値で解決しなさい。
また `func` の返り値が失敗した場合は一定時間後にリトライしなさい。一定回数以上 `func` が失敗した場合は `retryWithExponentialBackoff` の返り値を失敗させなさい。

作成した関数を使えば以下のようなコードで HTTP リクエストのリトライを行える:

```js
const resp = await retryWithExponentialBackoff(
  () => fetch("https://example.com"),
  5
);
```
 */

function retryWithExponentialBackoff(func, maxRetry) {      // func：Promise を返す非同期関数,リトライの最大回数
    let attempt = 0;                                        // 現在のリトライ回数を追跡する変数

    function executeFunction() {
        return func().then(
            (result) => Promise.resolve(result),            // 解決
            (error) => {                                    // 失敗
                attempt++;                                  // リトライ数＋＋
                if (attempt <= maxRetry) {                  
                    const delay = Math.pow(2, attempt - 1) * 1000; // attemptは1から始まるので、attempt - 1で待ち時間を計算
                    return new Promise((resolve) => setTimeout(resolve, delay)).then(executeFunction);
                } else {
                    return Promise.reject(error);           // 最大回数オーバー
                }
            }
        );
    }
    return executeFunction();
}
export { retryWithExponentialBackoff };
// 例の使用方法:
const resp = await retryWithExponentialBackoff(
  () => fetch("https://example.com"),
  5
);

// 動作確認用の関数
const fetchWithRetry = () => {
    return retryWithExponentialBackoff(
        () => {
            console.log("Trying to fetch...");
            return fetch("https://example.com").then(response => {
                if (!response.ok) {
                    throw new Error('Fetch failed');
                }
                return response;
            });
        },
        5
    );
};
/*
// 動作確認
fetchWithRetry()
    .then(response => {
        console.log("Fetch succeeded:", response);
    })
    .catch(error => {
        console.error("Fetch failed after retries:", error);
    });
*/
/*
//11章 ex16
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
    */
