import { isNonZero, safeJsonParse } from "./index.js";

describe("isNonZero", () => {
  it("", () => {
    expect(isNonZero(0)).toBe(false);
  });
  it("", () => {
    expect(isNonZero(42)).toBe(true);
  });
  it("", () => {
    expect(isNonZero(-0.5)).toBe(true);
  });

});

describe("safeJsonParse", () => {
  it("", () => {
    expect(safeJsonParse('{"a": 1}')).toEqual({a: 1});
  });
  it("", () => {
    expect(safeJsonParse("{Invalid Json}")).toEqual({error: "SyntaxError: Unexpected token I in JSON at position 1"});
  });


});
