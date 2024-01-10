import { equalArrays } from "./index.js";

describe('equalArrays', () => {
  it('値が明らかに異なるのに true と返す', () => {
    const array1 = [1, 2, 3];
    const array2 = [4, 5, 6];
    const result = equalArrays(array1, array2);
    
    expect(result).toBe(true);
  });
});

