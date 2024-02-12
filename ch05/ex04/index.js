/**
 * ## 問題 5.4 💻 🧪
初項と第 2 項を 1 とするフィボナッチ数列 (1, 1, 2, 3, ...) の最初の 10 個を返す関数を、while 文によるループを使って書きなさい。
同様に、do/while 文を使って書きなさい。
同様に、for 文を使って書きなさい。
**出題範囲**: 5.4
 */


// DoWhile
export function fibonacciDoWhile(n) {
    const sequence  = [1,1];
    let i = 2;
    do{
        const next = sequence[i - 1] + sequence[i - 2];
        sequence.push(next);
        i++;
    }while(i < n);
    return sequence;
}

// const fibonaccisequenceDoWhile = fibonacciDoWhile(10);
// console.log(fibonaccisequenceDoWhile);
console.log(fibonacciDoWhile(10));

// While
export function fibonacciWhile(n) {
    const sequence  = [1,1];
    let i = 2;
    while(i < n){
        const next = sequence[i - 1] + sequence[i - 2];
        sequence.push(next);
        i++;
    }
    return sequence;
}
console.log(fibonacciWhile(10));
// const fibonaccisequenceWhile = fibonacciWhile(10);
// console.log(fibonaccisequenceWhile);


// for
export function fibonacciFor(n) {
    const sequence  = [1,1];
    for (let i = 2; i < n; i++){
        const next = sequence[i - 1] + sequence[i - 2];
        sequence.push(next);
    }
    return sequence;
}

// const fibonaccisequence = fibonacciFor(10);
// console.log(fibonaccisequence);

