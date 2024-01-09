/*
## 問題 1.5 💻📄🧪

本問題の ch01/ex05 以下に含まれるコードを利用し `abs` 関数のテストを実行しなさい。

```sh
> npm install
> npm test ch01/ex05
```

`abs` を参考に `sum` および `factorial` の実装およびテストコードを作成し、テストしなさい。

**出題範囲**: 1.3
*/

// abs関数
export function abs(x){
    if(x >= 0){
        return x;
    }else{
        return -x;
    }
}
// return Math.abs(num);

// sum関数
export function sum(array){
    let sum = 0;
    for(let x of array){
        sum += x;
    }
    return sum;
}
// sum(primes);

// 階乗
export function factorial(num){
    if( num === 0 || num === 1){
        return 1;
    }else if(num < 0){
        return "undefined";     // 階乗は負の整数には定義されていないため結果は不明確
    }else{
        return num * factorial(num - 1);
    }
}

