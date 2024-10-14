// このような関数は絶対に書いてはならない。
function set42(key) {
  eval(`${key} = 42;`);
console.log(hello); // 42
}




// 例:
let hello;
set42("hello");
//console.log(set42("hello")); // 42
/*
function set42(key) {
  console.log(key);
  eval(`let key = 42;`);
  console.log(hello); // 42
}
*/
// console.log(hello); // 42
//set42('__proto__.isAdmin = true');

//let hello = "obj.__proto__ === Object.prototype";
// console.log(hello);


// console.log("hello");
/*
let x = 10;
let y = 20;
let result = eval("x + y");
console.log(result);  // 出力: 30
*/
