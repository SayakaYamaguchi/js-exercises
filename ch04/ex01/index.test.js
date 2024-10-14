import { add, sub, mul, div } from "./index.js";
function Complex(real, imaginary){
  this.real = real;
  this.imaginary = imaginary;
}
const complex1 = new Complex(2, 3);
const complex2 = new Complex(1, 4);

const complex3 = new Complex(0, 0);
const complex4 = new Complex(0, 0);

describe("add", () => {
  it("add", () => {
    expect(add(complex1,complex2)).toEqual({ real: 3, imaginary: 7 });
  });
  it("add 0", () => {
    expect(add(complex3,complex4)).toEqual({ real: 0, imaginary: 0 });
  });
/*
    it("returns negated value when negative value given", () => {
      expect(add(-42)).toBe(42);
    });

    it("returns zero value when zero given", () => {
      expect(add(0)).toBe(0);
    });
    */
  });

  describe("sub", () => {
    it("sub", () => {
      expect(sub(complex1,complex2)).toEqual({ real: 1, imaginary: -1 });
    });
    it("sub 0", () => {
      expect(sub(complex3,complex4)).toEqual({ real: 0, imaginary: 0 });
    });
  });

  describe("mul", () => {
    it("mul", () => {
      expect(mul(complex1,complex2)).toEqual({ real: -10, imaginary: 11 });
    });
    it("mul 0", () => {
      expect(mul(complex3,complex4)).toEqual({ real: 0, imaginary: 0 });
    });
  });

  describe("div", () => {
    it("div", () => {
      expect(div(complex1,complex2)).toEqual({ real: 0.8235294117647058, imaginary: -0.29411764705882354 });
    });
    it("div", () => {
      expect(div(complex3,complex4)).toEqual({ real: NaN, imaginary: NaN });
    });
  });
