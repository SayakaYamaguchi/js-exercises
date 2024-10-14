import {
  nestedUnwritableObj,
  unwritableAndUnconfigurableObj,
  writableAndUnconfigurableObj,
} from "./index.js";

test("テスト: 書き換え不可、設定変更不可のオブジェクト", () => {
  const a = unwritableAndUnconfigurableObj();
  expect(a).toStrictEqual({ a: 1 });    // 初期値の確認
  expect(() => (a.a = 3)).toThrow();    // 書き換え不可の確認
  expect(() => delete a.a).toThrow();   // 削除不可の確認
});

test("テスト: 書き換え可能、設定変更不可のオブジェクト", () => {
  const b = writableAndUnconfigurableObj();
  expect(b).toStrictEqual({ b: 2 });    // 初期値の確認
  b.b = 3;
  expect(b.b).toBe(3);                  // 書き換え可の確認
  expect(() => delete b.b).toThrow();   // 削除不可の確認
});

test("テスト: ネストされた書き換え不可のオブジェクト", () => {
  const c = nestedUnwritableObj();
  expect(c).toStrictEqual({ c: { d: { e: 3 } } });  // 初期値の確認
  expect(() => (c.f = 1)).toThrow();                // 新しいプロパティ追加の禁止
  expect(() => (c.c.f = 1)).toThrow();              // ネストされたオブジェクトに対する新しいプロパティ追加の禁止
  expect(() => (c.c.d.f = 1)).toThrow();            // さらにネストされたオブジェクトに対する新しいプロパティ追加の禁止
  expect(() => (c.c.d.e.f = 1)).toThrow();          // 最も内側のプロパティに対する新しいプロパティ追加の禁止
});
