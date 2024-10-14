import { test, expect } from "@playwright/test";


test('商品フィルタリングのテスト', async ({ page }) => {
  await page.goto('path/to/your/index.html');

  const select = page.locator('select[data-testid="select"]');
  const foodItem = page.locator('li[data-testid="food1"]');
  const stationeryItem1 = page.locator('li[data-testid="stationery1"]');
  const stationeryItem2 = page.locator('li[data-testid="stationery2"]');

  // 初期状態ですべてのアイテムが表示されていることを確認
  await expect(foodItem).toBeVisible();           // 食品アイテムが表示されているか確認
  await expect(stationeryItem1).toBeVisible();    // 文房具アイテム1が表示されているか確認
  await expect(stationeryItem2).toBeVisible();    // 文房具アイテム2が表示されているか確認

  // 食品カテゴリを選択
  await select.selectOption('food');
  await expect(foodItem).toBeVisible();
  await expect(stationeryItem1).not.toBeVisible();  // notがつくと文房具アイテム1が表示されていないことを確認
  await expect(stationeryItem2).not.toBeVisible();

  // 文房具カテゴリを選択
  await select.selectOption('stationery');
  await expect(foodItem).not.toBeVisible();
  await expect(stationeryItem1).toBeVisible();
  await expect(stationeryItem2).toBeVisible();

  // すべてカテゴリを選択
  await select.selectOption('all');
  await expect(foodItem).toBeVisible();
  await expect(stationeryItem1).toBeVisible();
  await expect(stationeryItem2).toBeVisible();
});