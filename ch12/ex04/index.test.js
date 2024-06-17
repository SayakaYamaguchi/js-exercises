import {generator} from "./index.js";

  // テスト
  describe("generator", () => {
    it("Prime number generator", () => {
      const gen = generator();
/*
      const primes = [];
      for (let i = 0; i < 5; i++) {
        primes.push(gen.next().value);
      }
      const expectedPrimes = [2, 3, 5, 7, 11];
      expect(primes).toEqual(expectedPrimes);
*/
expect(gen.next().value).toEqual(2);
expect(gen.next().value).toEqual(3);
expect(gen.next().value).toEqual(5);
expect(gen.next().value).toEqual(7);
expect(gen.next().value).toEqual(11);
expect(gen.next().value).toEqual(13);
expect(gen.next().value).toEqual(17);
expect(gen.next().value).toEqual(19);
expect(gen.next().value).toEqual(23);
expect(gen.next().value).toEqual(29);

//      expect(gen.next().value).toBe(1); // 1
      
    });
  });