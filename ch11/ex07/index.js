
let str = "()()())"
/*
let str = "(()(()))";
let str = "(((())))"

let str = "((())"
let str = "()()())"
*/
// 置換前後の文字列が異なる間ループを続ける
while(true){
    console.log(str);
    let originalLength = str.length;

    str = str.replace(/\(\)/g, "");

    let newLength = str.length;

    if(newLength === originalLength){
        break;
    }
}

console.log(str);

