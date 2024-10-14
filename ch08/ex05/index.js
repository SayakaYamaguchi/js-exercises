/*
## 問題 8.5 💻🧪
可変長引数を受け取り、以下の仕様でオブジェクトを返却する関数 `sequenceToObject(...values)`を作成しなさい。
1. 奇数番に string の値を受け取り偶数番に任意の値を受け取り、各偶数奇数のペアで `{奇数番の値: 偶数番の値}`の形式になるオブジェクトを返却する。例えば`sequenceToObject("a", 1, "b", 2)`は`{a: 1, b: 2}`を返却する
2. いずれかの奇数番の値が string でない場合、または値の個数の合計が偶数ではない場合は例外を発生させる
また作成した sequenceToObject に対してスプレッド演算子で配列を与えられることを確認しなさい。
**出題範囲**: 8.3.2, 8.3.4
*/

// 再起
export function sequenceToObject(...values){
    const obj = {};
    try{
        for(let i = 0; i < values.length; i += 2){
        const propName = values[i];
        const propValue = values[i + 1];
        if(typeof propName !== "string" ){
            throw new Error("プロパティ名が文字列以外になっている");
        }
        obj[propName] = propValue;
        }
        return obj;
    }catch(error){
        return error.message;
    }
}
// console.log(sequenceToObject("a", 1, "b", 2));  // =>{a: 1, b: 2}
// console.log(sequenceToObject(1, 1, "b", 2));  // =>{a: 1, b: 2}
