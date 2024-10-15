self.onmessage = function (event) {
    try {
    console.log("フィルタ処理を開始します...");
    const { data, width, height, kernel, kernelSum, kernelSize } = event.data;
  
    const halfKernelSize = Math.floor(kernelSize / 2);
    const outputData = new Uint8ClampedArray(data.length);
  
    // ガウシアンフィルタの適用
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
  
        const outputIndex = (y * width + x) * 4;
        outputData[outputIndex] = r / kernelSum;
        outputData[outputIndex + 1] = g / kernelSum;
        outputData[outputIndex + 2] = b / kernelSum;
        outputData[outputIndex + 3] = data[outputIndex + 3]; // アルファ値はそのまま
      }
    }
  
    // メインスレッドに処理結果を返す
    console.log("フィルタ処理が完了しました。");
    self.postMessage({ outputData });
  } catch (error) {
    console.error("ワーカースレッド内でエラーが発生しました:", error);
    }
  };
