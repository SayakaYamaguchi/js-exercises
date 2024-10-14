/*
# 練習問題: 9 章
## 問題 9.1 💻📄
与えられたテストケースを満たすクラス C を作成しなさい。
```
import { C } from "./index.js"; // ts でも可
test("class puzzle", () => {
  expect(C.method()).toBe(1);
  expect(new C().method()).toBe(2);
  expect(C.C.method()).toBe(3);
  expect(new C.C().method()).toBe(4);
  expect(new C().C.method()).toBe(5);
  expect(new new C().C().method()).toBe(6);
});
```

  expect(A.method()).toBe(1);
  expect(new A().method()).toBe(2);
  expect(A.B.method()).toBe(3);
  expect(new A.B().method()).toBe(4);
  
  expect(new A().B.method()).toBe(5);
  expect(new new A().B().method()).toBe(6);

**出題範囲**: 9.3.1
*/

export class A{
    static method() {    // 静的メソッド expect(C.method()).toBe(1);
        return 1;
    }
    method() {           // インスタンスメソッド expect(new C().method()).toBe(2);
        return 2;
    }


    static get B() {    // 静的クラス 
        return class {
            static method() {    // 静的クラスの静的メソッド expect(C.C.method()).toBe(3);
                return 3;
            }

            method() {   // 静的クラスのインスタンスメソッド expect(new C.C().method()).toBe(4);
                return 4;  
            }

        };
    }
}

