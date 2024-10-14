/**
## 問題 6.6 💻🧪
任意のオブジェクトを受け取り、そのオブジェクトのすべての独自プロパティ（列挙不可、プロパティ名が `Symbol`のものを含む）および列挙可能な継承プロパティのプロパティ名の配列を返す関数を作成しなさい。
**出題範囲**: 6.6
 */

let obj = {};
function definePropertyFromObj(obj, prop, descriptor) {
    Object.defineProperty(obj, prop,descriptor);
}

const proto = {
    prop0: 99,
    enumerable: false,   // 列挙不可
}
const descriptor0 = {
    value : 100,
    writable: true,     // 書き込み可
    enumerable: true,   // 列挙可能
    configurable: true  // 設定可  
}
definePropertyFromObj(obj,'newProperty',descriptor01);


const myObj = Object.create(proto);

const descriptor01 = {
    value : 100,
    writable: true,     // 書き込み可
    enumerable: true,   // 列挙可能
    configurable: true  // 設定可  
}
definePropertyFromObj(obj,'newProperty',descriptor01);


const propArray = [];           // プロパティ名の配列
export function propsPush(myObj) {
    for (let key in myObj){
//        console.log(Object.values(obj));   // => プロパティの列挙
//        console.log(key);

    propArray.push(key);
    }
    console.log(propArray);
    return(propArray);
}


// ループで順番を確認　列挙不可も表示ver
for (let key in myObj){
    propArray.push(key);
    console.log(`${key} : ${myObj[key]}`);
}

// ループで順番を確認　列挙不可は非表示ver
Object.keys(myObj).forEach(key => {
    propArray.push(key);
    console.log(`${key} : ${myObj[key]}`);
});


// テスト

propsPush(myObj);

