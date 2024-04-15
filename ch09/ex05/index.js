/*
## 問題 9.5

`instanceof`と等価な関数 `instanceOf(object, constructor)`を作成しなさい。
関数内部での `instanceof` の利用は不可。

作成した関数に対してテストを作成しなさい。
テストケースには少なくとも以下を含むこと。

- 多段に継承したクラスのインスタンスと基底クラスのコンストラクタを入力するケース
- 継承関係にないインスタンスとクラスのコンストラクタを入力するケース

**出題範囲**: 9.5.2
*/

// instanceOf関数の実装
export function instanceOf(object, constructor) {
    let proto = Object.getPrototypeOf(object);
    while (proto !== null) {
      if (proto === constructor.prototype) {
        return true;
      }
      proto = Object.getPrototypeOf(proto);
    }
    return false;
  }
  
  // テストケース
  class A {}
  class B extends A {}
  class C extends B {}
  
  const objA = new A();
  const objB = new B();
  const objC = new C();
  
