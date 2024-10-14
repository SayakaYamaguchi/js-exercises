/*
## 問題 12.3 💻🧪
P.372 で例示されている、`throw()`を使ってリセットを行うカウンタのようなジェネレータを実装しなさい。
**出題範囲**: 12.4.3
*/
export function* counter() {
    let count = 0;
    while (true) {
        try {
            const reset = yield count;
            if (reset !== undefined) {
                count = reset;
            } else {
                count++;
            }
        } catch (error) {
            count = 0; // リセット
            yield `Counter reset due to ${error}`;
        }
    }
}
/*
// ジェネレータを作成
const c = counter();

// 初期の値を取得
console.log(c.next().value); // Output: 0

// カウントアップ
console.log(c.next().value); // Output: 1
console.log(c.next().value); // Output: 2

// リセット
console.log(c.throw(new Error("Manual reset"))); // Output: Counter reset due to Error: Manual reset

// 再度カウントアップ
console.log(c.next().value); // Output: 0
console.log(c.next().value); // Output: 1
*/