/*
問題 14.6 💻🧪
以下のような関数を作成しなさい。

任意のオブジェクトを引数に取る

そのオブジェクトの任意のメソッド呼び出しに対して、以下を持つオブジェクトを配列に追加して保存する Proxy を作成する。
言い換えると Proxy 経由のオブジェクトのメソッド呼び出し履歴を配列に記録する

呼び出された時刻
メソッド名
パラメータ(引数)
Proxy と 配列 双方への参照を返却する

出題範囲: 14.6
*/

export function createLoggingProxy(targetObj) {
    // 呼び出し履歴を記録する配列
    const callHistory = [];

    // ハンドラオブジェクト
    const handler = {
        get(target, property, receiver) {
            const original = Reflect.get(target, property, receiver);
            // プロパティが関数（メソッド）である場合のみプロキシを適用
            if (typeof original === 'function') {
                return function(...args) {
                    // 呼び出し履歴に追加
                    callHistory.push({
                        timestamp: new Date().toISOString(),
                        method: property,
                        arguments: args
                    });
                    // 元のメソッドを呼び出す
                    return original.apply(target, args);
                };
            }
            return original;
        }
    };

    // Proxyオブジェクトの作成
    const proxy = new Proxy(targetObj, handler);

    // Proxyと履歴配列への参照を返却
    return {
        proxy,
        callHistory
    };
}
