/**
 * ## 問題 5.1 💻
文ブロックを使って同じ関数内に同じ変数名の const を複数宣言する関数を書きなさい。
**出題範囲**: 5.2
 */
function test(){
    {
        const a = 2;
        console.log(a);
    }
    {
        const a = 100;
        console.log(a);
    }
}

test();