/*

## 問題 13.13 💻🧪

12 章の演習問題で実装した `walk` 関数の非同期ジェネレータ版を実装しなさい:

```js
// 利用例
(async () => {
  // カレントディレクトリ (.) のファイル・フォルダを再帰的に取得し表示する
  for await (const elem of walk(".")) {
    console.log(elem);
  }

  // NOTE: walk に与えたパスが以下のようなディレクトリ・ファイルを持つ時を考える
  // .
  // ├── A
  // ├── B
  // │   └── C
  // │       └── buz.txt
  // └── foo.txt
  //
  // この気 `walk` は以下を返す (順序は任意):
  // - { path: "A", isDirectory: true }
  // - { path: "B", isDirectory: true }
  // - { path: "B/C", isDirectory: true }
  // - { path: "B/C/buz.txt", isDirectory: false }
  // - { path: "foo.txt", isDirectory: false }
})();
```

**出題範囲**: 13.4
*/
import fs from 'fs';
import path from 'path';

/*
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
  
*/

// 非同期ジェネレータ関数として定義
export async function* walk(rootPath) {
  // fs.promises.readdir を使用して指定されたディレクトリのエントリを非同期に読み取り
  // withFileTypes: true オプションを指定し、各エントリがディレクトリかどうかを判定するための追加情報を取得
  const entries = await fs.promises.readdir(rootPath, { withFileTypes: true });
  // 取得したエントリをループ処理
  for (const entry of entries) {
     // path.joinで各エントリの完全なパスを生成
      const entryPath = path.join(rootPath, entry.name);
      // エントリがディレクトリかどうかを判定
      const isDirectory = entry.isDirectory();
      // 各エントリのパスとディレクトリかどうかの情報をオブジェクトとして返す
      yield {
          path: entryPath,
          isDirectory: isDirectory
      };
       // もしエントリがディレクトリならば、再帰的に walk 関数を呼び出し、内部のエントリも探索
      if (isDirectory) {
          yield* walk(entryPath);
      }
  }
}


(async () => {
  // カレントディレクトリ (.) のファイル・フォルダを再帰的に取得し表示する
  for await (const elem of walk(".")) {
    console.log(elem);
  }

  // NOTE: walk に与えたパスが以下のようなディレクトリ・ファイルを持つ時を考える
  // .
  // ├── A
  // ├── B
  // │   └── C
  // │       └── buz.txt
  // └── foo.txt
  //
  // この気 `walk` は以下を返す (順序は任意):
  // - { path: "A", isDirectory: true }
  // - { path: "B", isDirectory: true }
  // - { path: "B/C", isDirectory: true }
  // - { path: "B/C/buz.txt", isDirectory: false }
  // - { path: "foo.txt", isDirectory: false }
})();
