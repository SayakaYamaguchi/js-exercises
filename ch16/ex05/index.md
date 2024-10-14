## 問題 16.5 🖋️💻

1. 標準入力、標準出力、標準エラー出力、リダイレクト、パイプという単語について調べなさい
2. 以下のコードを `cat.mjs` というファイルに保存し、後述する実験の結果を予測し、実際に実験しなさい

```js
import fs from "fs";

if (process.argv.length > 2) {
  // process.argv コマンドライン引数を格納した配列
  // process.argv[0]にはnodeの実行パス、process.argv[1]には実行するスクリプトファイル（この場合はcat.mjs）のパス
  // node cat.js foo.txt といった形式ならばファイルを読み込み標準出力に出力する
  fs.createReadStream(process.argv[2]).pipe(process.stdout);
  // fs.createReadStream(process.argv[2])は、指定されたファイルを読み込み、その内容をストリームとして扱う
} else {
  // そうでなければ標準入力を標準出力に出力する
  process.stdin.pipe(process.stdout);
  // .pipe(process.stdout)は、そのストリームをstdout（標準出力）に直接送る
  // これにより、ファイルの内容がコンソールに表示される
}
```

実験: `file` は適当なファイルとし `invalid-file` は存在しないファイルとしなさい

- `node cat.mjs`
- `echo FOO | node cat.mjs`
- `node cat.mjs > output.txt`
- `node cat.mjs file`
- `node cat.mjs file > output.txt`
- `node cat.mjs invalid-file > output.txt`
- `node cat.mjs invalid-file 2> error.txt`

**出題範囲**: 16.1


### 標準入力 
・コンピュータ上で実行されているプログラムが、特に何も指定されていない場合に標準的に利用するデータ入力元
・コマンド/アプリ側で入力元・出力先を明示することなく使用できる入力
・キーボードからの入力、ファイルや他のコマンドの出力からの入力など

### 標準出力
・コンピュータ上で実行されているプログラムが、特に何も指定されていない場合に通常のメッセージやプログラムの結果を表示する際の出力先
・画面（コンソール）に表示される通常のメッセージや処理結果

### 標準エラー出力
・プログラムがエラーメッセージや警告メッセージを表示するための専用の出力先。標準出力とは別
・エラーメッセージが表示されるコンソールなど

標準出力と標準エラー出力は別物なので、ログへの出力も別となる。エラーの管理やデバッグがしやすくなっている。
例
console.log("標準出力");
console.error("エラーメッセージ");

### リダイレクト
・プログラムの出力先を変更すること
・ログの出力内容をtxtファイルに保存するなど

### パイプ
・あるコマンドやプログラムの出力を、別のコマンドやプログラムの入力に直接つなげる仕組み
・複数のプログラムをつなげて一連の処理を行うことができるため、一時的なファイルを作成することがなくなり、効率的に処理できる



- `node cat.mjs`
　　予測：入力した内容と同じ内容が標準出力として表示する
　　実行：あああ
　　　　　あああ
- `echo FOO | node cat.mjs`
　　予測：コマンドラインでいれたFOOをそのまま標準出力として表示する
　　実行：FOO
- `node cat.mjs > output.txt`
　　予測：output.txtというファイルを新規に作成し、入力した内容をリダイレクトで保存する
　　実行：output.txtを作成。コマンド終了時に入力内容を保存。
- `node cat.mjs file`
　　予測：fileの中身を代美子m、標準出力にその内容を表示する
　　実行：This is a test file（fileの本文）
- `node cat.mjs file > output.txt`
　　予測：fileの本文をoutput.txtに上書き保存する。リダイレクトで出力先を変更なので、ターミナルの表示はなし
　　実行：同等
- `node cat.mjs invalid-file > output.txt`
　　予測：リダイレクト先のファイルがないので標準エラー出力としてターミナルにエラー内容を表示する
　　実行：予測＋output.txtはもともと入っていた本文が消え空になった
- `node cat.mjs invalid-file 2> error.txt`
　　予測：2>でエラー内容をリダイレクトしerror.txtにエラー内容を保存する
　　実行：同等
