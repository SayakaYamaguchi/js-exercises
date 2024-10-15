document.getElementById("image").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) {
    return;
  }

  const img = new Image();
  const reader = new FileReader();

  reader.addEventListener("load", (e) => {
    img.src = e.target.result;
  });

  img.addEventListener("load", () => {
    const originalCanvas = document.getElementById("original");
    const filteredCanvas = document.getElementById("filtered");
    const originalCtx = originalCanvas.getContext("2d");
    const filteredCtx = filteredCanvas.getContext("2d");

    originalCanvas.width = img.width;
    originalCanvas.height = img.height;
    filteredCanvas.width = img.width;
    filteredCanvas.height = img.height;

    originalCtx.drawImage(img, 0, 0);

    const imageData = originalCtx.getImageData(0, 0, img.width, img.height);
    const data = imageData.data;

  //  filteredCtx.filter = 'blur(5px)';
  //  filteredCtx.drawImage(img, 0, 0);

    // グレースケールへの変換 (RGB を足して平均を取っている)
    //
    // ガウシアンフィルタを実装する場合はこの周辺のコードを変更しなさい
    // imageData の中身はそのままに別の配列に結果を格納するとよい
    // ```js
     const outputData = new Uint8ClampedArray(imageData.data.length);
    //
    // // TODO: ここで imageData.data を参照して outputData に結果を格納
    const kernel = [
      1,  4,  6,  4,  1,
      4, 16, 24, 16,  4,
      6, 24, 36, 24,  6,
      4, 16, 24, 16,  4,
      1,  4,  6,  4,  1
    ];

    const kernelSum = 256; // カーネルの合計値（正規化に使用）
    const width = img.width;
    const height = img.height;

    // ワーカースレッドを使って画像処理
    console.log("ワーカースレッドにフィルタ処理を渡します...");
    const worker = new Worker('filterWorker.js');
    worker.postMessage({ data, width, height, kernel, kernelSum, kernelSize });

    worker.onmessage = function (e) {
      console.log("ワーカースレッドから結果を受け取りました。");
      const outputData = e.data.outputData;
      const outputImageData = new ImageData(outputData, img.width, img.height);
      filteredCtx.putImageData(outputImageData, 0, 0);
      console.log("フィルタ処理が完了し、画像が表示されました。");
    };
  });

  reader.readAsDataURL(file);
});