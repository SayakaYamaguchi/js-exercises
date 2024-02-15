/**
 * ## 問題 4.1 💻🧪
実部と虚部をプロパティとして持つ 2 つの複素数オブジェクトを引数として四則演算の結果を返す関数 `add`、`sub`、`mul`、`div` を実装しなさい。
**出題範囲**: 4.3
*/

function Complex(real, imaginary){
    this.real = real;
    this.imaginary = imaginary;
}

//足し算
export function add(complex1, complex2) {
    return new Complex(
    complex1.real + complex2.real,
    complex1.imaginary + complex2.imaginary);
}

// 引き算
export function sub(complex1, complex2) {
    return new Complex(
    complex1.real - complex2.real,
    complex1.imaginary - complex2.imaginary);
}

// 掛け算
export function mul(complex1, complex2) {
    return new Complex(
        complex1.real * complex2.real - complex1.imaginary * complex2.imaginary,
        complex1.real * complex2.imaginary + complex1.imaginary * complex2.real
    );
}

// 割り算
export function div(complex1, complex2) {
    const denominator = complex2.real ** 2 + complex2.imaginary ** 2;
    console.log(complex2.real, (complex2.real ** 2 ), complex2.imaginary, (complex2.imaginary ** 2), denominator);
    return new Complex(
        (complex1.real * complex2.real + complex1.imaginary * complex2.imaginary) / denominator,
        (complex1.imaginary * complex2.real - complex1.real * complex2.imaginary) / denominator
    );
}

/*
const complex1 = new Complex(2, 3);
const complex2 = new Complex(1, 4);

const complex1 = new Complex(0, 0);
const complex2 = new Complex(0, 0);

console.log('Addition:', add(complex1, complex2));
console.log('Addition:', sub(complex1, complex2));
console.log('Addition:', mul(complex1, complex2));
console.log('Addition:', div(complex1, complex2));
*/
