/*
## 問題 12.4 💻🧪
値が必要になるまで実際の計算を行わない評価戦略を遅延評価と呼ぶ。ジェネレータ関数は`next()`が呼ばれるまで評価が遅延される関数と考えることができる。
遅延評価を行うことで、例えば素数のような無限に続く値を扱うことができる。
呼び出しごとに素数を順番に返す無限ジェネレータを実装しなさい。素数を計算するアルゴリズムとしてエラトステネスの篩[^1]を使いなさい。
[^1]: `https://ja.wikipedia.org/wiki/%E3%82%A8%E3%83%A9%E3%83%88%E3%82%B9%E3%83%86%E3%83%8D%E3%82%B9%E3%81%AE%E7%AF%A9`
**出題範囲**: 12.3
*/

export function* generator(){
    let numbers = [];       // 素数判定用の配列
    let currentNumber = 2;  // 現在の数を2から開始

    // 無限ループ
    while(true){
        if (currentNumber >= numbers.length) {
            numbers.length = currentNumber + 1; // 必要に応じて配列を拡張
        }
        if (!numbers[currentNumber]) {      // 現在の数が素数であれば
            yield currentNumber;            // 素数を返す
            // 現在の数の倍数を非素数としてマーク

            // numbers.lengthでは4を素数として計算してしまった。
//            for (let i = currentNumber * currentNumber; i < numbers.length; i += currentNumber) {
            for (let i = currentNumber * currentNumber; i < 100000; i += currentNumber) {
                numbers[i] = true;
            }
        }
        currentNumber++; // 次の数へ
    }
}
