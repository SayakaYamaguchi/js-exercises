/*
## 問題 12.6 💻🧪
指定されたディクトリ内のファイル/ディレクトリをを再帰的に探索するジェネレータ関数 `function* walk(rootPath)` を作成しなさい。
ファイルとディレクトリのみを考慮すれば良く、シンボリックリンクやブロックデバイスなどは無視して良い。
`fs` モジュールの同期関数 (`fs.xxxSync()`) を利用すること。


取得できるデータは以下のプロパティを持つオブジェクトにすること。
- `path`: ファイル/ディレクトリのパス文字列
- `isDirectory`: ディレクトリであれば `true`, そうでなければ `false`
**出題範囲**: 12.3.2
*/
import fs from 'fs';
import path from 'path';

export function* walk(rootPath){
    // const entries = fs.readFileSync(rootPath, {withFileTypes: true});
    // .readdirSync()  指定されたディレクトリ内のエントリの名前を配列として返す。
    //                 ディレクトリ内のエントリがサブディレクトリやファイルである場合、その名前が配列の要素として含まれる。
    // withFileTypes: true 各エントリがディレクトリかどうかを判定するための追加情報を取得
    const entries = fs.readdirSync(rootPath, { withFileTypes: true });
    // 取得したエントリのリストをループ処理
    for(const entry of entries){
        // 各エントリの完全なパスを生成
        const entryPath = path.join(rootPath, entry.name);
        // entryがディレクトリかどうかを判定
        const isDirectory = entry.isDirectory();
        // 各エントリのパスとディレクトリかどうかの情報をオブジェクトとして返す
        yield{
            path: entryPath,
            isDirectory: isDirectory
        };
        // もしエントリがディレクトリならば、再帰的にwalk関数を呼び出し、内部のエントリも探索
        if(isDirectory){
            yield* walk(entryPath);
        }
    }
}

/*
const gen = walk('c:/www/http_server');
for(const entry of gen){
    console.log(entry);
}

*/