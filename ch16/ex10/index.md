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


## fs.createReadStream
非同期のストリーミングAPIで、ファイルを部分ごとに読み込む
メモリの使用量が効率的です。特に大きなファイルに対しては、メモリの消費を最小限に抑える
→部分的にメモリに読み込んでストリームとして処理するため、メモリの増加が緩やか


rss（Resident Set Size）プロセスが確保している物理メモリの使用量
heapTotalヒープ全体
heapUsed使用中のヒープ
external外部リソース

中文（52.04 MB）
Memory usage at before upload:
  rss: 42.54 MB
  heapTotal: 8.18 MB
  heapUsed: 6.64 MB
  external: 0.84 MB
Upload successful: File uploaded successfully

Memory usage at after upload:
  rss: 69.97 MB（+27.43 MB 増加）
  heapTotal: 11.43 MB
  heapUsed: 8.1 MB
  external: 24.38 MB

長文（106.5 MB）
Memory usage at before upload:
  rss: 42.79 MB
  heapTotal: 8.18 MB
  heapUsed: 6.62 MB
  external: 0.84 MB
Upload successful: File uploaded successfully

Memory usage at after upload:
  rss: 58.42 MB
  heapTotal: 11.43 MB
  heapUsed: 7.34 MB
  external: 12.97 MB


## fs.read
ファイルを一度にバッファに読み込むための関数
ファイルが重いほどメモリの増加率が高くなる


中文（52.04 MB）
Memory usage at before reading file:
  rss: 41.46 MB
  heapTotal: 8.18 MB
  heapUsed: 6.65 MB
  external: 52.88 MB
Memory usage at after reading file:
  rss: 93.93 MB（+52.47 MB 増加）
  heapTotal: 10.44 MB
  heapUsed: 5.72 MB
  external: 52.86 MB
Upload successful: File uploaded successfully

長文（106.5 MB）
Memory usage at before reading file:
  rss: 41.58 MB（+104.28 MB 増加）
  heapTotal: 8.18 MB
  heapUsed: 6.68 MB
  external: 104.91 MB
Memory usage at after reading file:
  rss: 145.86 MB
  heapTotal: 11.19 MB
  heapUsed: 5.89 MB
  external: 104.9 MB
Upload successful: File uploaded successfully



