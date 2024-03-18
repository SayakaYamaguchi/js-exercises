/*
## 問題 6.4 💻
[Object.defineProperty()](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) を使うと、writable 属性/enumerable 属性/configurable 属性を設定してオブジェクトのプロパティを定義できる。
このメソッドを使って明示的に各属性を設定したプロパティを定義し、プロパティの変更、削除、`hasOwnProperty` と `propertyIsEnumerable` の結果に対してどのように影響するか確認するコードを書きなさい。
**出題範囲**: 6.3 - 6.6
*/
let obj = {};
function definePropertyFromObj(obj, prop, descriptor) {
    Object.defineProperty(obj, prop,descriptor);
    console.log(`プロパティ名: ${prop}`);
    console.log(`値: ${obj[prop]}`);
    console.log(`.hasOwnProperty: ${obj.hasOwnProperty(prop)}`);
    console.log(`.propertyIsEnumerable: ${obj.propertyIsEnumerable(prop)}`);
//    console.log(`.propertyIsEnumerable: ${obj[prop] = 100}`);            // => プロパティの変更
//    console.log(`.propertyIsEnumerable: ${delete obj[prop]}`);           // => プロパティの削除
    console.log(`.Object.values: ${Object.values(obj)}`);   // => プロパティの列挙
    console.log(`---`);
}



const descriptor01 = {
    value: 99,
    writable: true,     // 書き込み可
    enumerable: true,   // 列挙可能
    configurable: true  // 設定可  
}
definePropertyFromObj(obj,'newProperty',descriptor01);

const descriptor02 = {
    value: 99,
    Writable: false,     // 書き込み不可
    enumerable: false,   // 列挙不可
    configurable: false // 設定不可  
}
 definePropertyFromObj(obj,'newProperty',descriptor02);

// descriptor02は書き込み、設定不可なので変更削除がエラーとなる
// 列挙不可に設定したい場合はfor...in ループや Object.keys()、Object.values()、Object.entries() などのメソッドでプロパティを取得する場合、空の扱いとなる。falseにはならない


