/*
## 問題 6.5 💻
次の条件を満たすオブジェクトを作成し、for/in ループで順番を確認しなさい。
- プロトタイプを一つ以上もつ
- プロトタイプと同名と同名でない数字、文字列のプロパティをもつ
- プロトタイプはオブジェクトと同名ではない数字、文字列のプロパティももつ
- プロトタイプは列挙可のプロパティをもち、それと同名の列挙不可のプロパティをオブジェクトにもたせること
**出題範囲**: 6.6.1
*/


// プロトタイプオブジェクト
const proto = {
    1: "japan",
    genre: "ballGame",
    sports: "baseball",
    numberOfPeople: 9,
    111 : 111,
    10 : 10
};

// メインオブジェクト
const myObj = Object.create(proto);
myObj.JapaneseName = "サッカー"; 
myObj.sports = "soccer";
myObj.numberOfPeople = 11;
myObj['111'] = 0;
myObj['222'] = 222;



const obj1 = {x:0, y:0};
const obj2 = Object.create(obj1);

// プロトタイプオブジェクトに列挙可能プロパティを追加
Object.defineProperty(proto, 'enumerableProp', {
    value: 'Enumerable Property',
    enumerable: true   // 列挙可能
});

// メインオブジェクトに列挙不可プロパティを追加
Object.defineProperty(myObj, 'enumerableProp', {
    value: 'Enumerable Property',
    enumerable: false   // 列挙不可
});

// ループで順番を確認　列挙不可も表示ver
for (let key in myObj){
    console.log(`${key} : ${myObj[key]}`);
}
console.log('---');
// ループで順番を確認　列挙不可は非表示ver
Object.keys(myObj).forEach(key => {
    console.log(`${key} : ${myObj[key]}`);
});

/*　オブジェクト自体のプロパティが先に列挙され、その後にプロトタイプチェーン上のプロパティが列挙される。

111 : 0
222 : 222
JapaneseName : サッカー
sports : soccer
numberOfPeople : 11
1 : japan
10 : 10
genre : ballGame

*/
