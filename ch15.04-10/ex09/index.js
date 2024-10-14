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
    const kernelSize = 5;
    const halfKernelSize = Math.floor(kernelSize / 2);

    for (let y = halfKernelSize; y < height - halfKernelSize; y++) {
      for (let x = halfKernelSize; x < width - halfKernelSize; x++) {
        let r = 0, g = 0, b = 0;

        // カーネルの適用
        for (let ky = -halfKernelSize; ky <= halfKernelSize; ky++) {
          for (let kx = -halfKernelSize; kx <= halfKernelSize; kx++) {
            const pixelIndex = ((y + ky) * width + (x + kx)) * 4;
            const kernelValue = kernel[(ky + halfKernelSize) * kernelSize + (kx + halfKernelSize)];
            r += data[pixelIndex] * kernelValue;
            g += data[pixelIndex + 1] * kernelValue;
            b += data[pixelIndex + 2] * kernelValue;
          }
        }

        // 出力データに適用
        const outputIndex = (y * width + x) * 4;
        console.log(outputIndex);
        outputData[outputIndex] = r / kernelSum;
        outputData[outputIndex + 1] = g / kernelSum;
        outputData[outputIndex + 2] = b / kernelSum;
        outputData[outputIndex + 3] = data[outputIndex + 3]; // アルファ値は元のまま
      }
    }
    //
     const outputImageData = new ImageData(outputData, img.width, img.height);
     filteredCtx.putImageData(outputImageData, 0, 0);
    // ```
    /*
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i] = avg;
      data[i + 1] = avg;
      data[i + 2] = avg;
    }

    filteredCtx.putImageData(imageData, 0, 0);
  */
    });

  reader.readAsDataURL(file);
});
