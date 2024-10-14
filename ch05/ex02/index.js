/**
 * ## 問題 5.2 💻🧪
文字列のパラメータを取り、制御文字など文字列リテラル作成時エスケープシーケンスで記述する必要がある文字 (p37 表 3-1 の`\\`より上)を、エスケープシーケンスに変換した文字列を返すメソッドを書きなさい。
例えば文字列中に`\`が含まれていたら、`\\`に変換しなさい。if-else で分岐するバージョンと switch で分岐するバージョンの両方を作りなさい。
**出題範囲**: 5.3, 5.4.4
 */
const Lib = {
    '\0' : '\u0000',
    '\b' : '\u0008',
    '\t' : '\u0009',
    '\n' : '\u000A',
    '\v' : '\u000B',
    '\f' : '\u000C',
    '\r' : '\u000D',
    '\"' : '\u0022',
    '\'' : '\u0027',
    '\\' : '\u005C'
};
export function convertWithLibIf(input) {
    let result = '';
    for (let i = 0; i < input.length; i++) {
        const char = input[i];
        const unicode = char.charCodeAt(0).toString(16).toUpperCase();
        const unicodeEscape = '\\u' + '0000'.substring(0, 4 - unicode.length) + unicode;
    
        if (Lib.hasOwnProperty(unicodeEscape)) {
            result += Lib[unicodeEscape];
        } else {
            result += char;
        }
    }
    return result;
}


export function convertWithLibSwitch(input) {
    let result = '';
    for (let i = 0; i < input.length; i++) {
        const char = input[i];
        switch(char){
            case '\0':
            case '\b':
            case '\t':
            case '\n':
            case '\v':
            case '\f':
            case '\r':
            case '\"':
            case '\'':
            case '\\':
                result += Lib[char];
                break;
            default:
                result += char;
                break;
        }
    }
    return result;
}


  
// テスト
//  const inputString = 'This is a string with\nnew line and\ta null character: \u0000';
  const inputString = 'This is a string with new line and a null character:"';
  console.log(convertWithLibIf(inputString));
  console.log(convertWithLibSwitch(inputString));