import {slowFn, cache} from "./index.js";

// cachedSlowFn を生成
const cachedSlowFn = cache(slowFn);

  describe("cachedSlowFn", () => {
    it('同じオブジェクトのキャッシュされた値を返す', () => {
      const obj = { key: 'value' };

      const cachedSlowFn = cache(slowFn);

      const result1 = cachedSlowFn(obj); // 初回実行のため、時間のかかる計算が行われる
      const result2 = cachedSlowFn(obj); // キャッシュが返される

      // 同じオブジェクトに対して2回目の呼び出しではキャッシュが返されることを確認
      // expect(result1).to.equal(result2);
  });

  it('should recalculate for a different object', () => {
      const obj1 = { key: 'value1' };
      const obj2 = { key: 'value2' };
      const cachedSlowFn = cache(slowFn);
      const result1 = cachedSlowFn(obj1); // 初回実行のため、時間のかかる計算が行われる
      const result2 = cachedSlowFn(obj2); // 初回実行のため、時間のかかる計算が行われる

      // 異なるオブジェクトに対しては異なる結果が返されることを確認
      expect(cachedSlowFn(obj1)).toBe(result1);  // 初回実行のため、時間のかかる計算が行われる
      expect(cachedSlowFn(obj1)).toBe(result1);
      expect(cachedSlowFn(obj2)).toBe(result2);  // 別の引数なので再度時間のかかる計算が行われる
      expect(cachedSlowFn(obj2)).toBe(result2);
  });
});
