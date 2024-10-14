/**
 * ## 問題 4.10 💻

配列 `["r", "i", "c", "o", "h"]` の `"o"` の要素を `delete` で削除したとき、削除後の配列の内容と `length` の値をコンソール出力で確認しなさい。

**出題範囲**: 4.13.4
let obj = ["r", "i", "c", "o", "h"];
delete obj.o;
"o" in obj;

 */
let obj = ["r", "i", "c", "o", "h"];

console.log(obj);           // => ["r", "i", "c", "o", "h"]
console.log(obj.length);    // => 5
console.log(delete obj[obj.indexOf("o")]);  // => true
console.log(obj);           // => ["r", "i", "c", <1 empty item>, "h"]
console.log(obj[3]);        // => undefined
console.log("o" in obj);    // => false 削除済の為
console.log(obj.length);    // => 5 deleteの削除分はないが配列の長さは変わらない
