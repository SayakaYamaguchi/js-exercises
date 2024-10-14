/**
 * ## 問題 5.8 🖋️
以下のプログラムの出力を予想し、実際の実行結果を確認しなさい。
**出題範囲**: 5.5.7
*/
let x = 0;
for(let i = 1; i <= 5; i++) {
    x = i;
    try {
        throw Error();
    } catch {
        console.log("catch block");
        break;
    } finally {
        console.log("Finally block");
        continue;
    }
}
console.log(x);
