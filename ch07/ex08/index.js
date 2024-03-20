/*
## 問題 7.8 💻📄

文字列の書記素を反転させる関数を実装しなさい。例えば "家族 👨‍👨‍👧‍👧" が与えられれば "👨‍👨‍👧‍👧 族家" を返しなさい。
ヒント: [Intl.Segmenter](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter)
を使うか ゼロ幅接合子 について調べて実装しなさい。( [Intl.Segmenter](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter)を使う場合 tsconfig.js で ES2022 以上であることを確認して使用してください。)

文字列の書記素（grapheme）:ユーザーが一つの文字として認識するテキストの単位
一般的な1文字は1つの書記素として扱われますが、一部の絵文字や合成文字（例：絵文字シーケンスやスキンカラー修飾子など）は、複数のコードポイントから構成されるため、複数の書記素として扱われます。


**出題範囲**: 7.8.7
*/

function reverseGraphemeClusters(str) {
    // 文字列をセグメント化する
    const segmenter = new Intl.Segmenter("ja", { granularities: ["graphemeCluster"] });
    const segments = segmenter.segment(str);

    // セグメントを配列に変換し、反転する
    const reversedSegments = Array.from(segments, segment => segment.segment).reverse();

    // 反転されたセグメントを結合して文字列を生成する
    return reversedSegments.join("");
}

// 使用例
const input = "家族 👨‍👨‍👧‍👧";
const reversedString = reverseGraphemeClusters(input);
console.log(reversedString); // "👨‍👨‍👧‍👧 族家"