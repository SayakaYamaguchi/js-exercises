/*
## 問題 14.5 💻🧪

テンプレートリテラルを受けとり文字列を返す関数を作成しなさい。ただし戻り値において補間値はその値ではなく、その型名を展開しなさい。（厳密な型でなくて可）

- 例)
  - `` `${"A"}` `` -> `"string"`
  - `` `${{ x: 1 }}` `` -> `"object"`

**出題範囲**: 14.5
*/

export function determiningType(string, ...values){
  return string.reduce((result, str, i) => { // reduce メソッドで、テンプレートリテラルの文字列部分と挿入された値の型情報を連結する
        const value = values[i];       // 現在のインデックスに対応する挿入された値を取得
        const type = typeof value;    // 型を判定
        return result + str + (value !== undefined ? type : '');
    }, '');
}
