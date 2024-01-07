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
function abs(num){
    return Math.abs(num);
}

// sum関数
function sum(num1, num2){
    return num1 + num2;
}

// 階乗
function factorial(num){
    if( num === 0 || num === 1){
        return 1;
    }else if(num < 0){
        return "undefined";     // 階乗は負の整数には定義されていないため結果は不明確
    }else{
        return num * factorial(num - 1);
    }
}

module.exports = { abs, sum, factorial }
