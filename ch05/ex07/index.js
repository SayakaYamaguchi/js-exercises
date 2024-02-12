/**## 問題 5.7 🖋️
以下のプログラムの出力を予想し、実際の実行結果を確認しなさい。
```
function f() {
    try {
        return true;
    } finally {
        return false;
    }
}
console.log(f());
```
**出題範囲**: 5.5.7 */

function f() {
    try {
        return true;
    } finally {
        return false;
    }
}
console.log(f());
