## 問題 11.4 🖋️💻

ch11/ex04/index.js の実装を完成させ型付き配列と通常の配列で行列の乗算の速度を比較してみなさい。
また実行する前にどのような結果になるか予測しなさい。
**注意:** 問題 11.11 でも示すようにベンチマークの測定は難しい。
ここでは学習のため一から実装しているが、実際にベンチマークを行う場合は専用のライブラリを利用すること。

**出題範囲**: 11.2

通常の配列 (arrayMultiply)
型付き配列 (typedArrayMultiply)

***結論***
型付き配列の方が早い

***理由***
通常の配列は型を指定しない分、動的なサイズ変更や要素へのアクセスが柔軟だが、メモリ消費が高い
型付き配列はメモリ効率が高く数値演算の処理速度が早くなる為

