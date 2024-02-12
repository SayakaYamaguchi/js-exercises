/*
## 問題 3.2 💻

JavaScript の整数の最大値と最小値をコンソールに出力しなさい。なお最大値最小値は ES6 の `Number` のプロパティ定義を利用しなさい (3.2.3 参照)。
同様に最大値+1 をコンソールに出力しなさい。
最後に最大値+1 と最大値+2 を `===` で比較した結果をコンソールに出力し、そのように出力される理由を簡潔に文章で記載しなさい。

**出題範囲**: 3.2.3
*/

// 整数の最大値と最小値
console.log(Number.MIN_SAFE_INTEGER);   // 
console.log(Number.MAX_SAFE_INTEGER);   // 

// 最大値+1
const maxValuePlusOne = Number.MAX_SAFE_INTEGER + 1;
console.log(maxValuePlusOne);

// 最大値+1 と最大値+2 を `===` で比較した結果をコンソールに出力し、そのように出力される理由を簡潔に文章で記載しなさい。
const maxValuePlusTwo = Number.MAX_SAFE_INTEGER + 2;
if(maxValuePlusOne === maxValuePlusTwo){
    console.log('true');
    console.log('『JavaScriptが整数の範囲外での演算時に自動的に浮動小数点数に変換され、その際に精度が損なわれないようにしているためです。\n有効な範囲を超えると整数としての精度が損なわれる可能性があります。\nしかし、浮動小数点数としての表現が可能な範囲では精度の損失がないため、範囲外の整数演算が行われると自動的に浮動小数点数に変換されます。』\n\n調べて説明は読んだが、理解できない');
}
// MAX_SAFE_INTEGERより大きな値はあてにならず、桁が丸められて保証できない値になる
// 値が大きすぎると計算の結果があてにならんよっていう話
