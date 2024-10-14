/*
## 問題 7.1 💻🧪
2次元配列を行列として扱い、行列の加算・乗算を行う関数を作成しなさい。
**出題範囲**: 7.7
 */

// 行列の加算
export function Addition(matrix1, matrix2){
        if (matrix1.length !== matrix2.length || matrix1[0].length !== matrix2[0].length) { // matrix1の列数とmatrix2の行数が一致していることを確認する
            throw new Error('行と列の数が一致しない')
        }

        const result = [];                                          // 加算結果を格納する配列を初期化
        for (let i = 0; i < matrix1.length; i++){
            result[i] = [];
            for (let j = 0; j < matrix1[0].length; j++){
                result[i][j] = matrix1[i][j] + matrix2[i][j];       // 対応する要素同士を加算して結果を格納
            }
        }
        return result;                                              // 加算結果の行列を返す
}

// 行列の乗算
export function Multiplication(matrix1, matrix2){
//    try{
        if (matrix1.length !== matrix2.length) {
            throw new Error('行と列の数が一致しない');
        }
        const result = [];                                          // 乗算結果を格納する配列を初期化
        for (let i = 0; i < matrix1.length; i++) {
            result[i] = [];
            for (let j = 0; j < matrix2[0].length; j++) {
                let sum = 0;
                for (let k = 0; k < matrix1[0].length; k++) {       // 各要素同士を乗算し、結果を加算して格納
                    sum += matrix1[i][k] * matrix2[k][j];
                }
                result[i][j] = sum;
            }
        }
        return result;                                              // 乗算結果の行列を返す
//    }catch(error){
//        console.error.log('行列の乗算中にエラーが発生しました');
//    }
}
/*
const matrix1 = [
    [1, 2],
    [3, 4],
    [5, 6]
  ];
  const matrix2 = [
    [7, 8, 9],
    [10, 11, 12]
  ];
*/


const matrix1 = [
    [1,2],
    [3,4]
];

const matrix2 = [
    [5,6],
    [7,8]
];

console.log('Addition result:');
console.log(Addition(matrix1, matrix2));
console.log('Multiplication result:');
console.log(Multiplication(matrix1, matrix2));

/*
result = [
    [6,8],
    [10,12]
];
result = [
    [5,14],
    [15,28]
];
*/