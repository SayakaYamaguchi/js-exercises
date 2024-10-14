/*
## 問題 7.8 💻📄

文字列の書記素を反転させる関数を実装しなさい。例えば "家族 👨‍👨‍👧‍👧" が与えられれば "👨‍👨‍👧‍👧 族家" を返しなさい。
ヒント: [Intl.Segmenter](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter)
を使うか ゼロ幅接合子 について調べて実装しなさい。( [Intl.Segmenter](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter)を使う場合 tsconfig.js で ES2022 以上であることを確認して使用してください。)

文字列の書記素（grapheme）:ユーザーが一つの文字として認識するテキストの単位
一般的な1文字は1つの書記素として扱われますが、一部の絵文字や合成文字（例：絵文字シーケンスやスキンカラー修飾子など）は、複数のコードポイントから構成されるため、複数の書記素として扱われます。

Intl.Segmenter
国際化されたテキストを正確にセグメント化するためのAPI
セグメント化は、テキストを意味のある単位に分割するプロセスです。例えば、文字、単語、文、行などの単位に分割することができます。

new Intl.Segmenter("ja", { granularities: ["graphemeCluster"] })
"ja"　→　セグメンテーションを実行する際の言語タグ
granularities　→　セグメンテーションの粒度を設定
　graphemeCluster：書記素クラスタに基づいてセグメンテーションを行います。書記素クラスタは、一つの表示上の文字として見える文字列を構成する最小の単位
　word：単語単位でセグメンテーションを行います。空白文字などの区切り文字で単語を分割
　line：行単位でセグメンテーションを行います。改行文字でテキストを分割
　sentence：文単位でセグメンテーションを行います。文の区切り文字（ピリオド、疑問符、感嘆符など）でテキストを分割


**出題範囲**: 7.8.7
*/

export function reverse(str) {
    // 文字列をセグメント化する
    const segmenter = new Intl.Segmenter("grapheme", { granularities: ["grapheme"] });
    const segments = segmenter.segment(str);

    // セグメントを配列に変換し、反転する
    const reversedSegments = Array.from(segments, segment => segment.segment).reverse();

    // 反転されたセグメントを結合して文字列を生成する
    return reversedSegments.join("");
}

// 使用例
// const input = "家族 👨‍👨‍👧‍👧";     // =>👨‍👧‍👧 族家
//  const input = "👨‍👨‍👧‍👧 家族";     // =>族家 👨‍👨‍👧‍👧
// const input = `"𠮷野家"[0]`;     // =>]0["家野𠮷"
// const input = `"👨‍👨‍👧‍👧"[0]`;     // =>]0["👨‍👨‍👧‍👧"
/*
console.log(input);
const reversedString = reverse(input);
console.log(reversedString); // "👨‍👨‍👧‍👧 族家"
*/