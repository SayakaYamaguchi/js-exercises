/*
## 問題 12.2 💻🧪
ジェネレータ関数を使わずに、P.367 の`fibonacciSequence()`が返すジェネレータと同等のイテレータを返す関数を実装しなさい。
**出題範囲**: 12.3.1
*/

export function fibonacciSequence() {
    let x = 0, y = 1;
    return{
        next(){
            const value = y;
            [x, y] = [y, x+y]; // 分割代入を行っている。
            return {value, done:false};
        },
        [Symbol.iterator](){
            return this;
        }
    };
}

/*
function* fibonacciSequence() {
    let x = 0, y = 1;
    for(;;) {
        yield y;
        [x, y] = [y, x+y]; // 分割代入を行っている。
    }
}
    */