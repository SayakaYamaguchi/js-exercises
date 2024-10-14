/*
## 問題 11.14 💻🧪
以下の各関数を実装しなさい
**出題範囲**: 11.7
*/

// 1. 日本語文字列の配列を受け取り、文字列中の大文字・小文字("つ"と"っ"等)、濁点・半濁点("は"と"ば"と"ば"等)の違いを無視してソートする 
// `sortJapanese` 関数

export function sortJapanese(arr){
    return arr.sort((a,b) => {                          // 配列をsortメソッドでソート
        const normalizedA = normalizeJapanese(a);       // 正規化
        const normalizedB = normalizeJapanese(b);  

        const compare = normalizedA.localeCompare(normalizedB); // 正規化した文字列で比較 normalizedAが前=>-1、後ろ=>1、同じ=>0
        
        return compare === 0 ? a.localeCompare(b): compare;     // 正規化して同じ場合、元の文字列で再度比較
    });
}
function normalizeJapanese(str){
    const decomposed = str.normalize('NFKD');   // NFKD正規化で濁点と半濁点を分解 ば→は＋濁点
    const dellString = decomposed.replace(/[\u3099\u309A]/g, '')      // replaceで濁点（\u3099）および半濁点（\u309A）を削除
    return dellString
}
/*
const strings = ["つば", "つっ", "ばつ", "はば", "ばつ", "はつ", "っつ"];
console.log(sortJapanese(strings));
// =>["っつ", "つっ", "つば", "はば", "はつ", "ばつ", "ばつ"]
// =>['っつ', 'つっ', 'つば', 'はつ', 'ばつ', 'ばつ', 'はば']

const strings2 = ["つ", "ば", "は", "っ", "だ", "あ", "た", "わ", "ぱ" ];
console.log(sortJapanese(strings2));
*/

// 2. `Date` オブジェクトを受け取り、`令和6年4月2日` のように `(和暦)y年m月d日` のフォーマットで日付の文字列を返す `toJapaneseDateString` 関数
export function toJapaneseDateString(date){
    const eras = [                                                              // 各元号の開始日と終了日の定義をオブジェクトの配列で作成
        {name:'令和', start:new Date(2019,4,1), end: new Date(9999,11,31)},
        {name:'平成', start:new Date(1989,0,8), end: new Date(2019,3,30)},
        {name:'昭和', start:new Date(1926,11,25), end: new Date(1989,0,7)},
        {name:'大正', start:new Date(1912,6,30), end: new Date(1926,11,24)},
        {name:'明治', start:new Date(1868,0,25), end: new Date(1912,6,29)}
    ];
    for (const era of eras) {                                                   // 引数で渡された日付が配列のどの期間に該当するかループでチェック
        if (date >= era.start && date <= era.end) {                             // 一致したらその元号名と引数から年月日を取得
            const year = date.getFullYear() - era.start.getFullYear() + 1;
            const month = date.getMonth() + 1;
            const day = date.getDate();
            return `${era.name}${year}年${month}月${day}日`                      // 指定のフォーマットにして戻す 
        }
    }
    return '入力は 明治～令和 以外の日付にしてください';                            // どの元号の期間にも一致しない場合
}
/*
let meizi =  new Date(1912,6,29);
let keio =   new Date(1867,1,250);
let date = new Date();
console.log(date);
console.log(toJapaneseDateString(date));
console.log(toJapaneseDateString(meizi));
console.log(toJapaneseDateString(keio));
*/