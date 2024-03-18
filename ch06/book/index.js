// P.153 6.5 プロパティのテスト
/*
let o = {x:1};
console.log("x" in o);
console.log("y" in o);
console.log("toString" in o);
console.log("---");
console.log(o.hasOwnProperty("x"));
console.log(o.hasOwnProperty("y"));
console.log(o.hasOwnProperty("toString"));
console.log("---");
console.log(o.propertyIsEnumerable("x"));
console.log(o.propertyIsEnumerable("y"));
console.log(o.propertyIsEnumerable("toString"));
console.log(Object.prototype.propertyIsEnumerable("toString"));
console.log("---");
console.log(o.x !== undefined);
console.log(o.y !== undefined);
console.log(o.toString !== undefined);
*/
// P154 6.6 オブジェクトプロパティの調査
/*
console.log("---");
let o = {x:1, y:2, z:3};
console.log(o);
console.log(o.propertyIsEnumerable("toString"));
o.propertyIsEnumerable("toString");
for(let p in o){
    console.log(p);
}
console.log("---");

for(let p in o){
    if(!o.hasOwnProperty(p)) continue;
}
for(let p in o){
    if(typeof o[p] === "function")continue;
}
*/

// P155 6.6.1 プロパティの列挙順序
/*
const mySymbol = Symbol();
const mySymbol2 = Symbol();
console.log(mySymbol);
console.log(mySymbol2);
console.log(Symbol() === Symbol());
console.log(mySymbol === mySymbol2);

let person = {
    name: "John",
    age: -30,
    2: 10,
    111: 20,
    0.1: 0.1,
    gender: "male"
};

console.log(JSON.stringify(person));
console.log(`.Object.values: ${Object.values(person)}`);
*/

// P155 6.6 プロパティの列挙順序
