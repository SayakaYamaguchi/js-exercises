/*
問題 14.4 💻🧪
ひらがな 1 文字とその UTF-16 コード単位をプロパティとしてもつ独自クラスを、50 音順(UTF-16 コード単位順)で<や>で比較、
ソートできるようSymbol.toPrimitiveを用いて実装し、テストコードを書きなさい。 
文字列が期待される場合にはひらがなを、数字が期待される場合には UTF-16 コード単位を、
どちらでもない場合にはひらがなを返すようにし、テストコードで確認しなさい。

Symbol.toPrimitive オブジェクトをプリミティブ値（文字列や数値などの基本的な値）に変換するための特殊なメソッド

出題範囲: 14.4.7
*/

// HiraganaChar.js
export class HiraganaChar {
    constructor(char) {
        if (!char || char.length !== 1 || !char.match(/^[\u3040-\u309F]$/)) {   // コンストラクタで1文字のひらがなを受け取り、char とその UTF-16 コード単位 code をプロパティとして持つ。
            throw new Error('1文字のひらがなを指定してください');
        }
        this.char = char;
        this.code = char.charCodeAt(0);
    }

    [Symbol.toPrimitive](hint) {            // オブジェクトを対応するプリミティブ値に変換するために呼び出される関数値
        if (hint === 'number') {
            return this.code;
        } else if (hint === 'string') {
            return this.char;
        } else {
            return this.char;
        }
    }
}

