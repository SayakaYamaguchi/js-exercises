import {fibonacciDoWhile, fibonacciWhile, fibonacciFor} from "./index.js";
const fibonacci = [
    1,  1,  2,  3,  5,
    8, 13, 21, 34, 55
  ];

describe("fibonacciDoWhile", () => {
    it("DoWhile文でfibonacci数列を10個まで表示", () => {
        expect(fibonacciDoWhile(10)).toEqual(fibonacci);
    });
})

describe("fibonacciWhile", () => {
    it("While文でfibonacci数列を10個まで表示", () => {
        expect(fibonacciWhile(10)).toEqual(fibonacci);
    });
})

describe("fibonacciFor", () => {
    it("If文でfibonacci数列を10個まで表示", () => {
        expect(fibonacciFor(10)).toEqual(fibonacci);
    });
})

