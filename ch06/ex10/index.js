/*
## 問題 6.10 🧪
以下のコードの `// ここにコードを書く` の部分を実装し、 `obj` と等価なオブジェクト `answer` をプロパティの簡略記法とスプレッド演算子を使ってなるべくシンプルな記述で作成し、最後のマッチャーに成功するようなテストを作成しなさい。
**出題範囲**: 6.10.1, 6.10.4
*/

const obj1 = {
    foo: Math.random(),
    bar: Math.random(),
  };
  
  const obj2 = {
    fizz: Math.random(),
    buzz: Math.random(),
  };
  
  const obj3 = {
    bar: Math.random(),
    buzz: Math.random(),
  };
  
  const num1 = Math.random();
  const num2 = Math.random();
  
  const arr1 = [Math.random(), Math.random(), Math.random()];
  const arr2 = [Math.random(), Math.random()];
  
  const obj = {
    num1: num1,
    num2: num2,
    foo: obj1.foo,
    bar: obj3.bar,
    fizz: obj2.fizz,
    buzz: obj2.buzz,
    arr: [arr1[0], arr1[1], arr1[2], num1, arr2[0], arr2[1]],
  };
  
  const answer = {
    // ここにコードを書く
  };
  
  expect(answer).toEqual(obj);