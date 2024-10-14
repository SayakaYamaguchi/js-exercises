import { test, expect } from '@playwright/test';

test.describe('Inline Circle Web Component', () => {

  // テスト1: ページが正常にロードされるか確認
  test('should load the page and render inline circles', async ({ page }) => {
    await page.goto('http://localhost:5500/ch15.04-10/ex05/index.html');
    
    // ページが完全に読み込まれるまで待機
    await page.waitForLoadState('networkidle');

    // inline-circle要素が表示されるまで待機
    await page.waitForSelector('inline-circle');

    // すべての<inline-circle>コンポーネントを取得
    const inlineCircles = await page.locator('inline-circle');

    // コンポーネントが4つあることを確認
    await expect(inlineCircles).toHaveCount(4);

    // 各コンポーネントのシャドウDOMを確認し、スタイルが適用されていることを確認
    const firstCircle = await inlineCircles.nth(0).locator('div');
    await expect(firstCircle).toHaveCSS('border', '5px solid rgb(0, 139, 139)');
    
    const secondCircle = await inlineCircles.nth(1).locator('div');
    await expect(secondCircle).toHaveCSS('border', '8px double rgb(0, 0, 128)');
    
    const thirdCircle = await inlineCircles.nth(2).locator('div');
    await expect(thirdCircle).toHaveCSS('border', '12px dotted rgb(255, 20, 147)');
    
    const fourthCircle = await inlineCircles.nth(3).locator('div');
    await expect(fourthCircle).toHaveCSS('border', '12px groove rgb(0, 128, 0)');
  });
});
