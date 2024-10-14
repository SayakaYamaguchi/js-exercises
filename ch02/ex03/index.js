const panNFC = "\u30D1\u30F3";  // パンNFC   é を 1 つの Unicode 文字とする正規化
const panNFD = "\u30CF\u309A\u30F3";  // パンNFD   e とアクセント結合マークに分離する正規化

console.log(panNFC);
console.log(panNFD);