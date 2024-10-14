fetch("big.json")
  .then((response) => streamBody(response, updateProgress))
  .then((bodyText) => JSON.parse(bodyText))
  .then(handleBigJSONObject);

/**
 * fetch() リクエストから取得したResponse オブジェクトのボディをストリーム
 * 処理するための非同期関数。最初の引数としてResponse オブジェクトを渡す。
 * その後の2 つの引数にはコールバックを渡す。このコールバックは省略可能。
 *
 * 2 番目の引数として関数を指定した場合、このreportProgress コールバックは、
 * チャンクを受信するたびに1 度ずつ呼び出される。コールバック呼び出しのときの
 * 最初の引数は、これまで受信した総バイト数。2 番目の引数には、ダウンロードの
 * 完了度を示す0～1 の値が渡される。ただし、Response オブジェクトが
 * 「Content-Length」ヘッダを持たない場合は、常にNaN となる。
 *
 * データが届いたときに処理を行いたい場合は、3 番目の引数として関数を指定する。
 * このprocessChunk コールバックに、データのチャンクがUint8Array オブジェクト
 * として渡される。
 *
 * streamBody() は文字列で解決されるPromise を返す。processChunk コールバックが
 * 指定されていた場合、この文字列はコールバックから返された値を連結したものに
 * なる。processChunk コールバックが指定されていない場合は、データをUTF-8
 * 文字列に変換し連結したものになる。
 */
async function streamBody(response, reportProgress, processChunk) {
  // 全部で何バイト受信することになるのか。ヘッダがない場合はNaN。
  let expectedBytes = parseInt(response.headers.get("Content-Length"));
  let bytesRead = 0; // これまで受信したバイト数。
  let reader = response.body.getReader(); // この関数を使ってバイトデータを読み出す。
  let decoder = new TextDecoder("utf-8"); // バイトデータをテキストに変換する。
  let body = ""; // これまで読み出したテキスト。
  while (true) {
    // 下に抜けるまでループ。
    let { done, value } = await reader.read(); // チャンクを読み出す。
    if (value) {
      // バイト配列が得られたら、
      if (processChunk) {
        // コールバックが指定されている場合。
        let processed = processChunk(value); // バイトデータを処理する。
        if (processed) {
          body += processed;
        }
      } else {
        // 指定されていない場合、バイトデータを
        body += decoder.decode(value, { stream: true }); // テキストにする。
      }
      if (reportProgress) {
        // 進捗報告用のコールバックが指定
        bytesRead += value.length; // されていれば、呼び出す。
        reportProgress(bytesRead, bytesRead / expectedBytes);
      }
    }
    if (done) {
      // これが最後のチャンクなら、
      break; // ループを抜ける。
    }
  }
  return body; // 結合したボディテキストを返す。
}
