export function retryWithExponentialBackoff(func, maxRetry, callback) {
    let attempt = 0;
  
    async function executeFunction() {
      try {
        const result = await func(); // 非同期関数に対応
        if (result) {
          callback(true);
        } else {
          retry();
        }
      } catch (error) {
        retry();
      }
    }
  
    function retry() {
      attempt++;
      if (attempt <= maxRetry) {
        const delay = Math.pow(2, attempt - 1) * 1000; // attempt は 1 から始まる
        setTimeout(executeFunction, delay);
      } else {
        callback(false);
      }
    }
  
    executeFunction();
  }
  