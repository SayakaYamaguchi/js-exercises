/*
## 問題 8.2 💻🧪
べき乗 ($x^n$) を計算する関数を、べき乗演算子 (`**`) を使わずに再帰およびループでぞれぞれ実装しなさい。
可能なら再帰・ループの回数を少なくする工夫をしなさい。
**出題範囲**: 8.2.1
Math.pow 指定された数のべき乗を計算する関数
*/
// cost exponentiation = (x, y) =>{};

// 再起
export function exponentiationComeback(x,y){
    if (typeof x !== 'number' || typeof y !== 'number' || isNaN(x) || isNaN(y)) {
        return "引数が数値以外";
    }
    if(y === 0){
        return 1;
    }
    if (y < 0) {
        result = 1 / result; // 指数が負の場合、結果を逆数にする
    }
    if (x < 0 && y % 2 !== 0) {
        result = -result; // 負のベースで奇数乗の場合、結果に負の符号を付ける
    }
    // 再帰呼び出し: 指数が0でない場合、xに再帰的にexponentiationComeback関数を適用
    return x * exponentiationComeback(x, y-1);
}

// 末尾再起関数
function exponentiationComeback1(x, y) {
    if (typeof x !== 'number' || typeof y !== 'number' || isNaN(x) || isNaN(y)) {
        return "引数が数値以外";
    }
    if (y === 0) {
        return 1;
    }
    return exponentiationComebackHelper(x, y, 1);
}


// console.log(exponentiationComeback(2,0));
// console.log(exponentiationComeback(-2,3));
console.log(exponentiationComeback(2,2));

// Loop
/*
export const exponentiationLoop = (x,y) => {
    let result = 1;                     // 結果を初期化
    for(let i = 0; i < y; i++){         // for文で指数の数だけLOOP
        result = result * x;            // ベースの数をresultにかける
    }
    return result;
}
*/
export const exponentiationLoop = (x,y) => {
    if (typeof x !== 'number' || typeof y !== 'number' || isNaN(x) || isNaN(y)) {
        return "引数が数値以外";
    }
    if (y === 0) {
        return 1;       // 0乗は常に1
    }
    let result = 1;
    while(y > 0){       // 指数が0より大きい間LOOP
        result *= x;    // 結果にベースを乗算
        y--;            // 指数-1
    }
    if (y < 0) {
        result = 1 / result; // 指数が負の場合、結果を逆数にする
    }
    if (x < 0 && y % 2 !== 0) {
        result = -result; // 負のベースで奇数乗の場合、結果に負の符号を付ける
    }
    return result;
}

// console.log(exponentiationLoop(2,3));
