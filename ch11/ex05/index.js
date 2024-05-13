/*
## 問題 11.5 💻📄

バイナリデータの先頭数バイト (マジックバイト) を確認することでファイル種別を推測できる。
例えば PDF ファイルの場合、ファイルの先頭は `25 50 44 46 2D` といったバイト列になっている ([参考](https://en.wikipedia.org/wiki/List_of_file_signatures))。この知識があれば拡張子に頼らずにファイル種別を推測できる。

与えられたバイト列に対し、そのバイナリデータのファイル種別を返す関数 `detectFileType` を書きなさい。
考えられる全てのファイル種別に対応することは現実的ではないため、与えられたテストコードに対して動作する関数を書けば十分とする。

**注意**: マジックバイトを信用しすぎることで思わぬ結果になることもあるため注意 (参考: [ 画像ファイルによるクロスサイト・スクリプティング(XSS)傾向と対策](https://blog.tokumaru.org/2007/12/image-xss-summary.html))

**出題範囲**: 11.2
*/

export function detectFileType(buffer){
    const view = new DataView(buffer);
    //ファイルごとのマジックバイトのパターン定義
    const fileTypes = [
        {magicBytes : [0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x33], type: "PDF"},       // PDF v1.3
        {magicBytes : [0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x34], type: "PDF"},       // PDF v1.4
        {magicBytes : [0x50, 0x4b, 0x03, 0x04], type: "ZIP"},    // ZIPファイルのデフォルトマジックバイト
        {magicBytes : [0x50, 0x4b, 0x05, 0x06], type: "ZIP"},    // ZIPファイルの一部マジックバイト
        {magicBytes : [0x50, 0x4b, 0x07, 0x08], type: "ZIP"},    // ZIPファイルの空のマジックバイト
        {magicBytes : [0x47, 0x49, 0x46, 0x38, 0x37, 0x61], type: "GIF"},    // GIF87a形式
        {magicBytes : [0x47, 0x49, 0x46, 0x38, 0x39, 0x61], type: "GIF"},    // GIF89a形式
        {magicBytes : [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a], type: "PNG"}    // 
    ]

    // bufferの頭から各ファイル種別のマジックバイトと比較
    for (const { magicBytes, type } of fileTypes) {
        if (magicBytes.length <= view.byteLength) {
            let match = true;
            for (let i = 0; i < magicBytes.length; i++) {
                if (view.getUint8(i) !== magicBytes[i]) {
                    match = false;
                    break;
                }
            }
            if(match){
                return type;
            }
    
        }
    }
    return "UNKNOWN";
}


