import { littleEndianToBigEndian, bigEndianToLittleEndian } from "./index.js";

const uint32Array = new Uint32Array([0x12345678, 0xAABBCCDD, 0xFFFFFFFF]);

describe("littleEndian > bigEndian", () => {
  it("little > big convert", () => {
    const expectedResult = new Uint32Array([305419896, 2864434397, 4294967295]);
    
    const result = littleEndianToBigEndian(uint32Array);
    expect(result).toEqual(expectedResult);
  });
});

describe("bigEndian > littleEndian", () => {
  it("big > little convert", () => {
    const expectedResult = new Uint32Array([2018915346, 3721182122, 4294967295]);
    const result = bigEndianToLittleEndian(uint32Array);
    expect(result).toEqual(expectedResult);
  });
});
