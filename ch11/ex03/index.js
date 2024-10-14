/*
## 問題 11.3 💻🧪
引数として与えられる 符号なし 32 ビット整数の配列(Uint32Array) を受け取り、変換して符号なし 32 ビット整数の配列(Uint32Array) を返す次の二つの関数を実装しなさい。
- リトルエンディアンのバイト列として引数のデータを読み込み、ビッグエンディアンのバイト列に変換して返す関数
- ビッグエンディアンのバイト列として引数のデータを読み込み、リトルエンディアンのバイト列に変換して返す関数
**出題範囲**: 11.2
*/


// リトルエンディアンのバイト列として引数のデータを読み込み、ビッグエンディアンのバイト列に変換して返す関数
export function littleEndianToBigEndian (input){
    const output = new Uint32Array(input.length);       // input.length と同じ長さの新しい Uint32Array インスタンス output を作成
    const dataView = new DataView(input.buffer);        // input.buffer を使用して、input 配列が参照しているバッファ（ArrayBuffer）から DataView インスタンス dataView を作成

    for(let i = 0; i < output.length; i++){
        const value = dataView.getUint32(i * 4, true);  // dataView から符号なし32ビット整数（true：リトルエンディアン/小さいバイト順）を読み取る
        output[i] = value;                              // 取得した整数値 value は、output 配列の対応するインデックス i に格納
    }
    return output;
}

// ビッグエンディアンのバイト列として引数のデータを読み込み、リトルエンディアンのバイト列に変換して返す関数
export function bigEndianToLittleEndian (input){
    const output = new Uint32Array(input.length); 
    const dataView = new DataView(input.buffer); 

    for(let i = 0; i < output.length; i++){
        const value = dataView.getUint32(i * 4, false);  // dataView から符号なし32ビット整数（true：ビッグエンディアン/大きいバイト順）を読み取る
        output[i] = value;                              // 取得した整数値 value は、output 配列の対応するインデックス i に格納
    }
    return output;
}


// const uint32Array = new Uint32Array([0x12345678, 0xAABBCCDD, 0xFFFFFFFF]);
// const uint32Array = new Uint32Array([8, 0, 123]);
const uint32Array = new Uint32Array([-8, 0, -123]);

// リトル＞ビッグ
const bigEndianArray = littleEndianToBigEndian(uint32Array);
console.log(bigEndianArray);

// ビック＞リトル
const littleEndianArray = bigEndianToLittleEndian(uint32Array);
console.log(littleEndianArray);
