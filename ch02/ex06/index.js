// FizzBuzzとは
// 3で割り切れる場合はFizz
// 5で割り切れる場合はBuzz
// 3でも5でも割り切れる場合（すなわち15の倍数）は "FizzBuzz" と表示します。
/*
function FizzBuzz() {
    return Array.from({ length: 100 }, (_, i) => {      // 100の配列を作成、各要素にアロー関数を適用、第二引数i
      i += 1;                                           // returnの前にインデックスを一つ増やすので、開始時は0ではなく1から
      return (i % 3 === 0 ? "Fizz" : "") + (i % 5 === 0 ? "Buzz" : "") || i;  //　iが3で割りきれる場合はFizz,5で割り切れる場合はBuzz（+なので3と5両方割り切れる場合は両方通るのでFizzBuzz）、全てに該当しなければ空文字列になる。空の場合は空||iなので数字になる
    }).join("\n");                                      // Arrayでループする度に改行コードを入れる
  }
*/
const FizzBuzz = () => Array.from({ length: 100 }, (_, i) => (i += 1, (i % 3 === 0 ? "Fizz" : "") + (i % 5 === 0 ? "Buzz" : "") || i)).join("\n");
console.log(FizzBuzz());
// module.exports = { FizzBuzz };
export default { FizzBuzz };