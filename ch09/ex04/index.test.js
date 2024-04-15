
import { C } from "./index.js";

test("Private field test", () => {
    const c = new C();
    // プライベートフィールド x に直接アクセスできないので、getX() メソッドを使用して値を取得します。
    expect(c.x).toBe(undefined); // 初期値の確認
    expect(c.getX()).toBe(42); // メソッドを介して値が増加することを確認
});


  // 戦士クラスのテスト
  const warriorF = new WarriorF(10);
  console.log("戦士の攻撃力:", warriorF.atk); // 10
  console.log("戦士の攻撃ダメージ:", warriorF.attack()); // 20
  
  // 魔法戦士クラスのテスト
  const magicWarriorF = new MagicWarriorF(10, 5);
  console.log("魔法戦士の攻撃力:", magicWarriorF.atk); // 10
  console.log("魔法戦士の魔力:", magicWarriorF.mgc); // 5
  console.log("魔法戦士の攻撃ダメージ:", magicWarriorF.attack()); // 25