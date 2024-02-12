// 実部と虚部をプロパティとして持つ 2 つの複素数オブジェクトを引数として四則演算の結果を返す関数 `add`、`sub`、`mul`、`div` を実装しなさい。

function ComplexNumber(real, imaginary){
    this.real = real;
    this.imaginary = imaginary;
}

export function add(com1, com2) {
    let realPart = com1.real + com2.real;
    let imaginaryPart  = com1.imaginary + com2.imaginary;
    return new ComplexNumber(realPart, imaginaryPart);
}

// let complexNumber1 = [real:a, imaginary:b];
// let complexNumber2 = [real:a, imaginary:b];

// let result = add(complexNumber1, complexNumber2);


/*
export function add(a, b) {
    let z;
    let bi = b + 'i';
    z = a + '+' + bi;
    console.log(z);
    return z;
}
*/
export function sub(array) {
    let sum;
    for(let i of array){
        sum += i;
    }
    return sum;
}

export function mul(a, b) {
    let z;
    let bi = b + 'i';
    z = a + '+' + bi;
    console.log(z);
    return z;
}

export function div(a, b) {
    let z;
    let bi = b + 'i';
    z = a + '+' + bi;
    console.log(z);
    return z;
}
/*
function ComplexNumber(real, imaginary) {
    this.real = real;
    this.imaginary = imaginary;
  }
  
  // 四則演算の結果を返す関数
  function add(c1, c2) {
    // 実部と虚部の和を計算
    var realPart = c1.real + c2.real;
    var imaginaryPart = c1.imaginary + c2.imaginary;
  
    // 新しい複素数オブジェクトを作成して返す
    return new ComplexNumber(realPart, imaginaryPart);
  }
  
  // 例: 2つの複素数オブジェクトを作成
  var complex1 = new ComplexNumber(5, 3);
  var complex2 = new ComplexNumber(2, 1);
  
  // add 関数を呼び出して和を計算
  var result = add(complex1, complex2);
  
  // 結果をコンソールに表示
  console.log('和の複素数:', result.real, '+', result.imaginary, 'i');
  ComplexNumber();
  */
