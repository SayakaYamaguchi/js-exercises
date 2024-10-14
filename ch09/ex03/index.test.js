import { C } from "./index.js";

test("Private field test", () => {
    const c = new C();
    // プライベートフィールド x に直接アクセスできないので、getX() メソッドを使用して値を取得します。
    expect(c.x).toBe(undefined); // 初期値の確認
    expect(c.getX()).toBe(42); // メソッドを介して値が増加することを確認
});

