import {Addition,Multiplication} from "./index.js";
describe('Matrix Addition', () => {
    test('行列の加算：正常', () => {
      const matrix1 = [
        [1, 2],
        [3, 4]
      ];
      const matrix2 = [
        [5, 6],
        [7, 8]
      ];
      const expectedResult = [ [ 6, 8 ], [ 10, 12 ] ];
      expect(Addition(matrix1, matrix2)).toEqual(expectedResult);
    });
    test('行列の加算：行数に差分あり', () => {
      const matrix1 = [
        [1, 2],
        [3, 4]
      ];
      const matrix2 = [
        [5, 6, 1],
        [7, 8, 2]
      ];
      expect(() => {
        Addition(matrix1, matrix2);
      }).toThrow('行と列の数が一致しない');
    });

});
  
describe('Matrix Multiplication', () => {
    test('行列の乗算：正常', () => {
      const matrix1 = [
        [1, 2],
        [3, 4],
      ];
      const matrix2 = [
        [7, 8],
        [9, 10]
      ];
      const expectedResult = [ [ 25, 28 ], [ 57, 64 ] ];
      expect(Multiplication(matrix1, matrix2)).toEqual(expectedResult);
    });
  
    test('行列の乗算：行数に差分', () => {
      const matrix1 = [
        [1, 2],
        [3, 4]
      ];
      const matrix2 = [
        [7, 8, 9],
        [10, 11, 12]
      ];
      expect(() => {
        Multiplication(matrix1, matrix2);
      }).toThrow('行と列の数が一致しない');
    });
  });