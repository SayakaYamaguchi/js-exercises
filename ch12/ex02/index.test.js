import {fibonacciSequence} from "./index.js";

  // テスト
  describe("fibonacciSequence", () => {
    it("generates the correct Fibonacci sequence", () => {
      const fib = fibonacciSequence();
      expect(fib.next().value).toBe(1); // 1
      expect(fib.next().value).toBe(1); // 1
      expect(fib.next().value).toBe(2); // 2
      expect(fib.next().value).toBe(3); // 3
      expect(fib.next().value).toBe(5); // 5
      expect(fib.next().value).toBe(8); // 8
      
    });
  });