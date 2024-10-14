## 問題 13.6 🖋️

jQuery Deferred について調べ `Promise` との関係性について説明しなさい。

**出題範囲**: なし

## jQuery Deferred
https://api.jquery.com/jQuery.Deferred/

$.Deferred()を実行するとDeferredオブジェクトが作られ、これを介して処理の連携をとる
Deferredオブジェクトは、以下メソッドを持ち、これらを使って操作の完了、失敗、中間状態を通知でき

Deferredオブジェクトのメソッド　https://api.jquery.com/category/deferred-object/

deferred.resolve()          非同期処理が成功したことを示す
deferred.done()             成功（解決）時に呼び出されるコールバック関数を登録する
deferred.reject(args)       非同期処理の失敗時に拒否
deferred.fail()　           失敗時に呼び出されるコールバック関数を登録する
deferred.notify()　         進行中（Promiseにはない）
deferred.always()           常に実行される。Promiseのfinallyに相当

deferred.resolve(args)      非同期処理の完了時に解決
deferred.then()



非同期操作の成功時と失敗時のコールバックを登録できます。
Promiseは、resolveとrejectの二つの状態のみを持ち、中間状態を持たない


## Promise

## 関係性
両方非同期処理だが

# 類似点
・非同期操作の結果を管理

# 違い
・DeferredはjQueryライブラリの一部、PromiseはJavaScriptのネイティブ機能
・Deferredにはといったメソッドがあり、Promiseにはない
　Promiseはresolveやrejectを直接呼び出すことはできず、executor関数内でのみ使用する
・Deferredのnotify()メソッドは、Promiseには存在しない進捗通知のための機能

