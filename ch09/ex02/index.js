/*
## 問題 9.2 💻📄
値を読み出す度にその値が 1 ずつ増えていくフィールドを持つクラスを作りなさい。
そのフィールドの初期値は 0 とします。
```ts
import { C } from "./index.js"; // ts でも可
test("", () => {
  const c = new C();
  expect(c.x).toBe(0);
  expect(c.x).toBe(1);
  expect(c.x).toBe(2);
});
```
**出題範囲**: 9.3.2
*/

export class C {
    constructor() {
        this._value = 0;             // フィールド _value を初期化。値を保持
    }

    get x() {                       // プロパティ x を定義。これは値を読み取るたびに 1 ずつ増加。
        return this._value++;       // _value の値を返し、その後に 1 を加算。
    }
}