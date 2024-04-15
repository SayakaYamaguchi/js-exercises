/*
## 問題 9.4 💻 🧪

以下の仕様に基づいて RPG の戦士クラスと魔力を持った戦士である魔法戦士クラスをそれぞれ `class` を使った記法と `prototype` を使った記法で実装しなさい。

仕様

- 戦士は攻撃力 `atk` フィールドを持つ
- 戦士は攻撃 `attack` メソッドを持つ
- `attack` メソッドはそのインスタンスの `atk` の 2 倍の値をダメージとして返す
- 魔法戦士は戦士を継承する
- 魔法戦士は魔力 `mgc` フィールドを持つ
- 魔法戦士の `attack` は戦士としての `attack` の値にそのインスタンスの `mgc` の値を加算した値をダメージとして返す

**出題範囲**: 9.5.1

*/

console.log("クラス:"); // 25
// 戦士クラス
class Warrior {
    constructor(atk) {
      this.atk = atk;
    }
  
    attack() {
      return this.atk * 2;
    }
  }
  
  // 魔法戦士クラス
  class MagicWarrior extends Warrior {
    constructor(atk, mgc) {
      super(atk);
      this.mgc = mgc;
    }
  
    attack() {
      return super.attack() + this.mgc;
    }
  }
  // 戦士クラスのテスト
  const warrior = new Warrior(10);
  console.log("戦士の攻撃力:", warrior.atk); // 10
  console.log("戦士の攻撃ダメージ:", warrior.attack()); // 20
  
  // 魔法戦士クラスのテスト
  const magicWarrior = new MagicWarrior(10, 5);
  console.log("魔法戦士の攻撃力:", magicWarrior.atk); // 10
  console.log("魔法戦士の魔力:", magicWarrior.mgc); // 5
  console.log("魔法戦士の攻撃ダメージ:", magicWarrior.attack()); // 25


console.log("function:"); // 25
// 戦士クラス
export function WarriorF(atk) {
    this.atk = atk;
  }
  
  WarriorF.prototype.attack = function() {
    return this.atk * 2;
  };
  
  // 魔法戦士クラス
  export function MagicWarriorF(atk, mgc) {
    WarriorF.call(this, atk);
    this.mgc = mgc;
  }
  
  MagicWarriorF.prototype = Object.create(WarriorF.prototype);
  MagicWarriorF.prototype.constructor = MagicWarriorF;
  
  MagicWarriorF.prototype.attack = function() {
    return WarriorF.prototype.attack.call(this) + this.mgc;
  };



  // 戦士クラスのテスト
  const warriorF = new WarriorF(10);
  console.log("戦士の攻撃力:", warriorF.atk); // 10
  console.log("戦士の攻撃ダメージ:", warriorF.attack()); // 20
  
  // 魔法戦士クラスのテスト
  const magicWarriorF = new MagicWarriorF(10, 5);
  console.log("魔法戦士の攻撃力:", magicWarriorF.atk); // 10
  console.log("魔法戦士の魔力:", magicWarriorF.mgc); // 5
  console.log("魔法戦士の攻撃ダメージ:", magicWarriorF.attack()); // 25