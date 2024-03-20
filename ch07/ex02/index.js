/*
## 問題 7.2 💻

以下の関数を繰り返し (`for`, `while`) や条件分岐 (`if`) を利用せず `map`, `filter`, `reduce`, `forEach` 等のメソッドを利用して書き直しなさい。

```js
unction fizzbuzz(n) {
    for (let i = 1; i <= n; i++) {
      if (i % 15 === 0) {
        console.log("FizzBuzz");
      } else if (i % 3 === 0) {
        console.log("Fizz");
      } else if (i % 5 === 0) {
        console.log("Buzz");
      } else {
        console.log(i);
      }
    }
  }
  
  function sumOfSquaredDifference(f, g) {
    let result = 0;
    for (let i = 0; i < f.length; i++) {
      result += (f[i] - g[i]) ** 2;
    }
    return result;
  }
  
  function sumOfEvensIsLargerThan42(array) {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
      if (array[i] % 2 !== 0) {
        continue;
      }
      sum += array[i];
      if (sum >= 42) {
        return true;
      }
    }
    return false;
  }



```

**出題範囲**: 7.8.1
*/

function fizzbuzz(n) {
    const result = Array.from({ length: n }, (_, i) => i + 1)   // 1からnまでの配列を生成し、各要素に対してFizzBuzzのルールに従って処理する
      .map(num => {
        if (num % 15 === 0) return "FizzBuzz";      // 15の倍数の場合はFizzBuzzを返す
        if (num % 3 === 0) return "Fizz";           // 3の倍数の場合はFizzを返す
        if (num % 5 === 0) return "Buzz";           // 5の倍数の場合はBuzzを返す
        return num;                                 // それ以外の場合はそのままの数値を返す
      });
    result.forEach(item => console.log(item));      // 結果を出力する
}
  
function sumOfSquaredDifference(f, g) {             // 二つの配列の要素ごとの差の二乗の合計を計算する関数
    return f.reduce((acc, val, index) => {
      return acc + (val - g[index]) ** 2;           // 各要素ごとの差の二乗を合計する
    }, 0);
}
  
function sumOfEvensIsLargerThan42(array) {          // 配列の要素が42以上になるまで、偶数の合計が42を超えるかどうかを確認する関数
    let sum = 0;
    return array
      .filter(num => num % 2 === 0)                 // 配列の要素をフィルタリング　偶数
      .some(num => {                                // 各偶数を加算し、合計が42以上になるかどうかを確認する
        sum += num;
        return sum >= 42;
      });
}



fizzbuzz(15);
console.log("---")

const f = [1, 2, 3, 4, 5];
const g = [5, 4, 3, 2, 1];
console.log(sumOfSquaredDifference(f,g));
console.log("---");


const array1 = [1, 2, 3, 4, 5]; // 合計が 6 以上になる
const array2 = [1, 2, 3]; // 合計が 2 以下になる
const array3 = [1, 2, 3, 40]; // 合計が 42 になる
const array4 = [1, 2, 40, 40]; // 合計が 42 以上になる

console.log(sumOfEvensIsLargerThan42(array1));
console.log(sumOfEvensIsLargerThan42(array2));
console.log(sumOfEvensIsLargerThan42(array3));
console.log(sumOfEvensIsLargerThan42(array4));

console.log("---");
