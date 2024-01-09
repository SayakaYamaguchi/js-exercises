/*
## 問題 3.10 💻
`for` 文を使って、任意のオブジェクトのプロパティ名の一覧、値の一覧をそれぞれ出力しなさい。
**出題範囲**: 3.10.1
*/

const sweets = {
    itemname:'めんべい',
    name:'oil confectionery',
    InternalCapacity:2,
    phone:'0120-71-4444',
    address:'1-1-1 Isokawa, Minami-ku, Fukuoka City, Fukuoka Prefecture',
    Manufacturer:'Yamaguchi Aburaya Fukutaro Co., Ltd.'
};

console.log("<<プロパティ名一覧>>");
for (let key in sweets){
    console.log(key);
}

console.log("\n<<値の一覧>>");
for (let key in sweets){
    console.log(sweets[key]);
}
