/**
 * ## 問題 5.6 💻
try-catch-finallyの実行順序が確認できるコードを書きなさい。
**出題範囲**: 5.5.7
 */

function exampleFunction() {
    try {
      console.log("try block");
      throw new Error("Error in try block");
    } catch (error) {
      console.log("catch block");
      console.error(error.message);
    } finally {
      console.log("finally block");
    }
  }
  
  // 実行
  exampleFunction();