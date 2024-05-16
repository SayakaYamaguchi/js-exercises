/*
## 問題 11.15 💻📄
ベースのURL`base`、追加するクエリ`addQuery`、パス`path`を持つオブジェクトを引数に取り、
ベースのURLのパスとクエリを修正した文字列を返す関数`modifyUrl`を実装しなさい。
**出題範囲**: 11.9
*/

export function modifyUrl({ base, addQuery = [], path }) {
    // baseが正しいURL形式かどうかをチェック
    if (!isValidUrl(base)) {
        throw new Error('baseURLが無効');
    }

    const url = new URL(base);       // URL オブジェクトを作成

    // パスを修正
    if (path) {                     // path が指定されていれば、URL のパスを置き換える
        url.pathname = path;
    }

    //  addQuery が指定されていれば、クエリパラメータを追加する
    for (const [key, value] of addQuery) {
        url.searchParams.append(key, value);
    }

    return url.toString();
}

// 正しいURL形式かどうかをチェックする関数
function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
}
