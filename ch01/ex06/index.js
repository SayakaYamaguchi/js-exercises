/*
## 問題 1.6 💻🧪

`abs` や `factorial` のコードを参考にし、フィボナッチ数を計算する関数 `fib` を作成しなさい。例えば `fib(5)` は `5` を返し、`fib(50)` は `12586269025` を返さなければならない。

**出題範囲**: 1.3
*/

// fib関数
export function fib(num){
    if(num <= 0){
        return 0;
    }
    
    if(num === 1 || num  === 2){
        return 1;
    }
    return fib(num - 1) + fib(num - 2);
}
/*
時間かからない方法
for (let i = 0; i < 10; i++){
    console.log(fib(i));
}
*/
