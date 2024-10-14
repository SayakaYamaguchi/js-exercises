/*
## 問題 8.1 💻🧪
以下のアロー関数を簡潔に記載しなさい。なお、引数や戻り値の括弧の要否などをコードコメントで説明しなさい。
1. 自然数`n`と英数文字`c`を引数にとり、文字`c`を`n`回コンソール出力してから文字`c`を`n`個含む配列を返す
2. 数値`x`を引数にとり、`x`の二乗の数値を返す
3. 引数なしで、現在時刻のプロパティ`now`を含むオブジェクトを返す
*/
// 1
/*
const ans1 = (n, c) =>{
    let output = "";
    for(let i = 0; i < n; i++){
        console.log(c);
        output += c;
    }
    return Array(output);
}
*/
// console.log(ans1(3, "abc"));

export const ans12 = (n, c) => Array.from({ length:n },()=>{    // Array.from　新しい配列を生成　第一引数：要素数　第二引数：要素を生成のコールバック関数（無名）
    console.log(c);     
    return c;       // n回、作成した配列にcを戻す
});
// console.log(ans12(3, "abc"));
// console.log(ans12(0, "abc"));
// console.log(ans12(3, ));


// 2
export const factorial = x => {                     // 引数が一つなので()なし
    // 引数が正の整数が確認
    if(typeof x !== 'number' || isNaN(x)){
        return "引数が数値以外"
    }
    if(x <= 0){
        return "引数が0または負の整数"
    }

    let result = 1;
    for(let i = 2; i <= x; i++){        // 2からxまでのすべての整数をかけわせて階乗を計算
        result *= i;
    }
    return result;
}
/*
console.log(factorial(5));
console.log(factorial(0));
console.log(factorial("aiueお"));
console.log(factorial());
*/
// 3  引数なしで、現在時刻のプロパティ`now`を含むオブジェクトを返す
export const currentTime = () => {
    return{now : new Date()}        // {now : 現在時刻}
}

console.log(currentTime());
