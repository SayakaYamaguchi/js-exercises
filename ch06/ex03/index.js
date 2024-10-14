/*
## 問題 6.3 💻
[Object.prototype.isPrototypeOf()](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/isPrototypeOf) は、オブジェクトが別のオブジェクトのプロトタイプチェーンに存在するかどうかを判定できる。
このメソッドを使って、sampleコードにおいて、` o` が `p` および `q` のプロトタイプチェーン上に存在すること、および、`p` が `q` のプロトタイプチェーン上に存在することを確認しなさい。
また同様に、`Object`, `Array`, `Date`, `Map` のプロトタイプチェーンの継承関係を確認するためのコードも書きなさい。
**出題範囲**: 6.3.2
*/

let o = {};
o.x = 1;
// console.log(o);             // => { x: 1 }
let p = Object.create(o);
// console.log(p);             // => {}:p の中身は空だが、プロトタイプは o に設定
// console.log(p.x);           // => 1:p の中身は空でも、プロトタイプチェーン上で o のプロパティにアクセス可
p.y = 2;
// console.log(p);            // => { y: 2 }
let q = Object.create(p);
// console.log(q);             // => {}:p の中身は空だが、プロトタイプは p に設定
q.z = 3;
// console.log(o.z);
// console.log(q.z);
let f = q.toString();
// console.log(q.x);
// console.log(q.y);
// console.log(q.x + q.y);


// Array のプロトタイプチェーンの継承関係を確認
// let obj = [];
// console.log(Object.prototype.isPrototypeOf(q)); // true

function logPrototypeChain(obj) {
    let currentObj = obj;
    while (currentObj){
        console.log(currentObj);
        currentObj = Object.prototype.isPrototypeOf(currentObj);
    }
}

// 各オブジェクトのプロトタイプチェーンを表示
console.log("oのプロトタイプチェーン");
logPrototypeChain(o);

console.log("pのプロトタイプチェーン");
logPrototypeChain(p);

console.log("qのプロトタイプチェーン");
logPrototypeChain(q);

console.log('---');

// obj のプロトタイプチェーンの継承関係を確認
let obj = {};
console.log("obj");
console.log(Object.prototype.isPrototypeOf(obj)); // true

// Array のプロトタイプチェーンの継承関係を確認
let arr = [];
console.log("arr");
console.log(Array.prototype.isPrototypeOf(arr)); // true
console.log(Object.prototype.isPrototypeOf(arr)); // true

// Date のプロトタイプチェーンの継承関係を確認
let date = new Date();
console.log("Date");
console.log(Date.prototype.isPrototypeOf(date)); // true
console.log(Object.prototype.isPrototypeOf(date)); // true

// Map のプロトタイプチェーンの継承関係を確認
let map = new Map();
console.log("Map");
console.log(Map.prototype.isPrototypeOf(map)); // true
console.log(Object.prototype.isPrototypeOf(map)); // true