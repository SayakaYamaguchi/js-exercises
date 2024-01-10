/*
## 問題 3.12 💻 🧪
数値型のプロパティを持つオブジェクト `obj1(例： {x: 1})` を作成しなさい。
続いて、作成済みの `obj1` に、プロパティを追加できることを確認しなさい`(例： y: 2 を obj1 に追加)`。
更に、`obj1` と同じプロパティ内容`{例: {x:1, y:2}}` のオブジェクト `obj2` を新規作成し、`obj1` と `obj2` を`===` で比較し結果を確認しなさい。
最後に、`obj1` と `obj2` を引数にとり、２つのオブジェクトが同じ内容なら、別オブジェクトでも `true` を返す関数 `equals` を作成しなさい。
`equals` はテストコードも作成しなさい。
**出題範囲**: 3.8
*/

let obj1 = {x: 1};
console.log(obj1);       // => {x: 1}

obj1.y = 2;
console.log(obj1);       // => { x: 1, y: 2 }

let obj2 = { x: 1, y: 2 };

let same = obj1 === obj2;
console.log("obj1 === obj2:", same);  // => obj1 === obj2: false


export function equals(obj1,obj2){
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}



