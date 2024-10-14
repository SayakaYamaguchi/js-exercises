## 問題 16.10 💻

書籍 16.8 節の HTTP サーバを改造しファイルの取得だけでなくファイルをストリームでアップロードできるようにしなさい:

```js
// NOTE: file.txt の内容をアップロード
fetch("http://localhost:8000/foo/bar/hello.txt", {
  method: "PUT",
  body: fs.createReadStream("file.txt"),
  duplex: "half",
});
```

また大きな `file.txt` に対し `fs.createReadStream` を利用した場合と `fs.read` を利用した場合でメモリ使用量がどれだけ違うか確認しなさい。

**出題範囲**: 16.8
