/*
## 問題 6.9 🧪
以下のコードの `// ここに１行のコードを書く` の部分に１行だけコードを書いて、最後のマッチャーに成功するようなテストを作成しなさい。
```js
const mock = jest.fn();

const obj = {
  x: 0,
  y: 0,
  sum() {
    mock();
    return this.x + this.y;
  },
};
ここに１行のコードを書く

obj.x = 1;
obj.y = 2;
expect(JSON.stringify(obj)).toBe(`{"x":1,"y":2,"sum":3}`);
expect(mock).toHaveBeenCalled();
```
**出題範囲**: 6.9.4
*/
/*
const mock = jest.fn();
const obj = {
  x: 0,
  y: 0,
  sum() {
    mock();
    return this.x + this.y;
  },
};
// ここに１行のコードを書く
Object.defineProperty(obj, 'sum', {get: obj.sum});

obj.x = 1;
obj.y = 2;
expect(JSON.stringify(obj)).toBe(`{"x":1,"y":2,"sum":3}`);
expect(mock).toHaveBeenCalled();            // .toHaveBeenCalled() Jestテストフレームワークのモック関数が呼び出されたかどうかを検証するマッチャー（matcher）の1つ
*/


const mock = jest.fn();
const obj = {
  x: 0,
  y: 0,
  sum() {
    mock();
    return this.x + this.y;
  },
};
// ここに１行のコードを書く
Object.defineProperty(obj, 'sum', {get: obj.sum});
// Object.defineProperty プロパティの挙動をカスタマイズし、その動作を制御する
// objのsum プロパティに getter 関数を設定

obj.x = 1;
obj.y = 2;
expect(JSON.stringify(obj)).toBe(`{"x":1,"y":2,"sum":3}`);
expect(mock).toHaveBeenCalled();            // .toHaveBeenCalled() Jestテストフレームワークのモック関数が呼び出されたかどうかを検証するマッチャー（matcher）の1つ

