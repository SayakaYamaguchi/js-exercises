

## 問題 13.14 💻📄💪

`Promise.all` は便利だが、使い方によっては大量の非同期処理を同時に実行してしまい問題になる可能性がある。

```js
// 以下では 1000 HTTP リクエストが同時に実行される
const promises = [];
for (let i = 0; i < 1000; i++) {
  promises.push(fetch(`https://example.com`));
}
console.log(await Promise.all(promises));
```

一方で以下のように 1 つ 1 つ `Promise` を実行するのは時間がかかる:

```js
// 以下では 1000 HTTP リクエストを順に実行する
const promise = Promise.resolve([]);
const results = [];
for (let i = 0; i < 1000; i++) {
  promise = promise.then((results) => {
    return fetch(`https://example.com`).then((resp) => {
      results.push(resp);
      return results;
    });
  });
}
console.log(await promise);
```

そこで「同時に実行される数を制限」する仕組みを作ることにする。以下の `PromisePool` を完成させなさい。

**補足**: この問題は Java 研修の有名な問題 ([テストケース](https://github.com/YoshikiShibata/jpltest/blob/master/jpl/ch14/ex10/ThreadPoolTest.java)) の移植である。

```js
export class PromisePool {
  /**
   * Constructs PromisePool.
   *
   * @param queueSize the max size of queue
   * @param maxRunningPromises the maximum number of running promises at the same time.
   *
   * @throws Error if either queueSize or maxRunningPromises is less than 1
   */
  constructor(queueSize: number, maxRunningPromises: number) {
    throw new Error("not implemented");
  }

  /**
   * Starts PromisePool.
   *
   * @returns Promise, which will be rejected if this pool is already started
   */
  async start() {
    throw new Error("not implemented");
  }

  /**
   * Wait all promises for their terminations.
   * All requests dispatched before this method is invoked must complete
   * and this method also will wait for their completion.
   *
   * @returns Promise, which will be rejected if this pool has not been started.
   */
  async stop() {
    throw new Error("not implemented");
  }

  /**
   * Executes the specified promise from the given factory using this pool.
   * If the queue is full, then the returned Promise will not be fulfilled until the queue is not full.
   *
   * @param promiseFactory the function that retuns Promsie
   *
   * @returns Promise, which will be rejected if this pool has not been started.
   */
  async dispatch(promiseFactory: () => Promise<void>): Promise<void> {
    throw new Error("not implemented");
  }
}
```

**出題範囲**: なし
