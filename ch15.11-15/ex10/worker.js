// worker.js
self.onmessage = function (e) {
    const { data, width, height } = e.data;
    
    const outputData = new Uint8ClampedArray(data.length);
    const kernel = [
      1,  4,  6,  4,  1,
      4, 16, 24, 16,  4,
      6, 24, 36, 24,  6,
      4, 16, 24, 16,  4,
      1,  4,  6,  4,  1
    ];
    const kernelSum = 256; // カーネルの合計値（正規化に使用）
    const kernelSize = 5;
    const halfKernelSize = Math.floor(kernelSize / 2);
  
    for (let y = halfKernelSize; y < height - halfKernelSize; y++) {
      for (let x = halfKernelSize; x < width - halfKernelSize; x++) {
        let r = 0, g = 0, b = 0;
  
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
        outputData[outputIndex + 3] = data[outputIndex + 3]; // アルファ値は元のまま
      }
    }
  
    self.postMessage({ outputData, width, height });
  };
  