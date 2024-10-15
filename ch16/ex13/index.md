## 問題 16.13 💻

この章では何度か [シェル](https://ja.wikipedia.org/wiki/%E3%82%B7%E3%82%A7%E3%83%AB) という単語が登場した。ここまでに学んだ知識を元に簡単なシェルを作ってみよう。

[ex13/shell.js](ex13/shell.js) には作りかけのシェルの実装がある:

1. `node path/to/shell.js` と実行してみなさい

- コマンドの入力待機となったのでecho Helloを打ち込んだところ以下のENOENTエラーとなった
- ENOENT："Error NO ENTry"ファイルやディレクトリが存在しないことを示すエラーコード

```sh
node ./shell.js      
>echo Hello
Error: spawn echo ENOENT
    at ChildProcess._handle.onexit (node:internal/child_process:284:19)
    at onErrorNT (node:internal/child_process:477:16)
    at process.processTicksAndRejections (node:internal/process/task_queues:82:21) {
  errno: -4058,
  code: 'ENOENT',
  syscall: 'spawn echo',
  path: 'echo',
  spawnargs: [ 'Hello' ]
}
```

- Windowsでは、spawn でネイティブコマンドを実行する場合、デフォルトではシェルを経由せずに直接コマンドが実行されるため、echo のようなコマンドが見つからないことがあるので、`spawn` に `shell: true` を指定する
```sh
// コマンドを実行する関数
async function runcmd(cmd, stdin = null, stdout = null) {
  switch (cmd.type) {
    case " ": // ExecCmd
      await new Promise((resolve, reject) => {
        // stdin, stdout が指定されている場合はパイプを作成する
        const child = spawn(cmd.argv[0], cmd.argv.slice(1), {
          stdio: [
            stdin ? "pipe" : "inherit",
            stdout ? "pipe" : "inherit",
            "inherit",
          ],
          shell: true   // Windows環境でシコマンドはデフォルトのシステムシェルを通じて実行するため追加
        });
```


2. プログラム中の `FIXME` という箇所を修正しパイプやリダイレクトを実装しなさい

パイプやリダイレクトの例は以下:

```sh
# Linux
> echo HELLO | tr [:upper:] [:lower:] > hello.txt

# Windows (WSL が必要)
> wsl echo HELLO | wsl tr [:upper:] [:lower:] > hello.txt

# いずれも hello.txt に `hello` と書き込まれる

# Windows (WSL 不要)
# 問題: なぜ直接 dir を使わず cmd /c を書いているのだろうか？これらの意味は？
> cmd /c dir | cmd /c "findstr DIR"
```
パイプやリダイレクトなどの特殊なコマンドを含む場合、シェル経由でないと実行できない場合がある為、`cmd /c `を使ってシェル経由でコマンドを実行する

- 直接`dir`を使った場合
cmd.exeはそのコマンドを解釈し、ファイルとディレクトリの一覧を表示する
既に開いているシェルセッションの中でコマンドが実行される
シンプルにコマンドを実行する場合に使う。簡単で効率的


- `cmd /`を使った場合
新しい cmd.exe プロセスが一時的に生成され、その中で dir コマンドが実行し閉じる
一度限りのコマンド実行のために使う
外部プログラムから一度限りでコマンドを実行する場合や、複数のコマンドをまとめて実行する場合に使う


**注意**: ここでは説明を簡単にするために `spawn` を利用したが、これは一般的なシェルの実装とは異なることに注意。

**出題範囲**: なし
