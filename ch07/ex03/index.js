/*
## 問題 7.3 💻📄
reduce を使って関数 (sum, join, reverse, every, some) を実装しなさい。

**出題範囲**: 7.8.1
*/

// sum: 配列の要素の合計を計算する関数
export function sum(array){
    if (!array || array.length === 0) {                     // 引数の検証と初期値の設定
        return 0;
      }
    
      return array.reduce((acc, curr) => acc + curr, 0);     // 配列が空または未指定の場合は合計値として 0 を返す
}


// join: 配列の要素を連結して文字列を生成する関数
export function join(array, separator) {
    // 引数の検証
    if (!Array.isArray(array)) {
        throw new Error("Input must be an array");
    }
  
    // セパレータが未指定の場合は空文字列とする
    if (separator === undefined) {
        separator = "";
    }
  
    // reduce メソッドを使用して配列の要素を連結して文字列を生成する
    return array.reduce((acc, currentValue, index) => {
        if (index !== 0) {                                  // 最初の要素以外にセパレータを挿入する
            acc += separator;
        }
        acc += currentValue === null ? "" : currentValue;   // null は空文字列として扱う
        return acc;
    }, "");                                                 // 初期値として空文字列を指定
}


// reverse: 配列の要素を逆順に並べ替える関数
export function reverse(array) {
    if (!array) throw new Error("引数がありません");        // 引数が渡されていない場合はエラーをスローする
  
    return array.reduceRight((acc, currentValue) => {       // reduceRight メソッドを使用して配列を逆順に処理する
      acc.push(currentValue);                               // 現在の要素を累積配列の末尾に追加する
      return acc;
    }, []);                                                 // 初期値として空の配列を指定
  }

// every: 配列のすべての要素が条件を満たすかどうかを判定する関数
export function every(array, callback) {
    if (!array) throw new Error("引数がありません");             // 引数が渡されていない場合はエラーをスローする
  
    return array.reduce((acc, currentValue, index, arr) => {    // reduce メソッドを使用して配列のすべての要素を条件判定する
      return acc && callback(currentValue, index, arr);         // 累積結果と現在の要素を条件関数で評価し、その結果を累積結果として返す
    }, true);                                                   // 初期値として true を指定
  }

// some: 配列のすべての要素が条件を満たすかどうかを判定する関数
export function some(array, callback) {
    return array.reduce((acc, currentValue, index, arr) => {    // reduce メソッドを使用して配列の要素を条件判定する
      return acc || callback(currentValue, index, arr);         // 累積結果と現在の要素を条件関数で評価し、その結果を累積結果として返す
    }, false);                                                  // 初期値として false を指定
}


