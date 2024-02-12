/**
与えられた数値を 32 ビット整数表現形式で表現した場合に 1 であるビットの数を返す関数 `bitCount` を書きなさい。
例として `bitCount(0b111)` は 3 を返し、`bitCount(0b1111111111111111111111111111111)` は `31` を返しなさい。
 */

export function bitCount(num) {
    let count = 0;
    for(let i = 0; i < 32; i++){
        if((num & (1 << i)) !== 0){
            count++;
        }
    }
    console.log(count);
    return count;
}

// bitCount(0b1111111111111111111111111111111);
// bitCount(0b111);