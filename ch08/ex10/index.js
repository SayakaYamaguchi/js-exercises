/*
## 問題 8.10 💻📄
関数を引数に受け取り、 call 相当の動きをするプロパティ myCall を追加する関数 addMyCall(f)を実装しなさい。実装には bind を使い call や apply は使わないこと
**出題範囲**: 8.7.4, 8.7.5
*/

export function addMyCall(f) {
    f.myCall = function(context, ...args) {
        return f.bind(context)(...args);
    };
}

