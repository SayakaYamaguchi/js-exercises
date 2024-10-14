import { push, pop, shift, unshift, sort  } from "./index.js";
const originalArray = [1, 2, 3, 1, 2, 3, 4];
const originalArrayPush = [1, 2, 3, 1, 2,3, 4, 5, 6 ];
const originalArrayPop = [ 1, 2, 3, 1, 2, 3 ];
const originalArrayShift = [ 2, 3, 1, 2, 3, 4 ];
const originalArrayUnshift = [-2, -1, 0, 1, 2, 3, 1, 2, 3, 4 ];
const originalArraySort= [1, 1, 2, 2, 3, 3, 4 ];

describe('push', () => {
    it('push ', () => {
      expect(push(originalArray, 5, 6)).toStrictEqual(originalArrayPush);
    });
});

describe('pop', () => {
    it('pop ', () => {
      expect(pop(originalArray)).toStrictEqual(originalArrayPop);
    });
});

describe('shift', () => {
    it('shift ', () => {
      expect(shift(originalArray)).toStrictEqual(originalArrayShift);
    });
});

describe('unshift', () => {
    it('unshift ', () => {
      expect(unshift(originalArray, -2, -1, 0)).toStrictEqual(originalArrayUnshift);
    });
});

describe('sort', () => {
    it('sort ', () => {
      expect(sort(originalArray)).toStrictEqual(originalArraySort);
    });
});


/*
const newArrayAfterPush = push(originalArray, 5, 6);
const newArrayAfterPop = pop(originalArray);
const newArrayAfterShift = shift(originalArray);
const newArrayAfterUnshift = unshift(originalArray, -2, -1, 0);
const newArrayAfterSort = sort(originalArray);

*/
/*
console.log("originalArray:", originalArray);
console.log("newArrayAfterPush:", newArrayAfterPush);
console.log("newArrayAfterPop:", newArrayAfterPop);
console.log("newArrayAfterShift:", newArrayAfterShift);
console.log("newArrayAfterUnshift:", newArrayAfterUnshift);
console.log("newArrayAfterSort:", newArrayAfterSort);
*/