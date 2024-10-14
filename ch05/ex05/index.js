/**
 * ## 問題 5.5 💻🧪
{a: 1, b: 2, c: 3} のような値が数値のオブジェクトを引数にとり、値が偶数のプロパティだけを持ち(つまり奇数は取り除かれた)オブジェクトを返す書きなさい。
例えば{a: 1, b: 2, c: 3}であれば、{b: 2}を返しなさい。
**出題範囲**: 5.4.4, 5.4.5
 */

const obj = {a: 51, b: -15, c: 99};


export function leaveEvenNumbers(obj){
    const result = {};

    for(const [key,value] of Object.entries(obj)){
        if(value % 2 === 0){
            result[key] = value;
        }
    }

    return result;
}

console.log(leaveEvenNumbers(obj));