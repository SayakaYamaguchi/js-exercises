const { test, expect } = require('@playwright/test');
const path = require('path');

test('Inline Circle SVG Test', async ({ page }) => {
  // ローカルのindex.htmlへのパス
  const filePath = path.resolve(__dirname, './ch15.01-03/ex01/index.html');
  await page.goto(`file://${filePath}`);

  // 全てのinline-circle要素を取得
  const circles = await page.locator('inline-circle');

  // 各<inline-circle>要素のスタイルを検証する
  await expect(circles.nth(0)).toHaveAttribute('border-width', '5px');
  await expect(circles.nth(0)).toHaveAttribute('border-color', '#008b8b');

  await expect(circles.nth(1)).toHaveAttribute('border-width', '8px');
  await expect(circles.nth(1)).toHaveAttribute('border-style', 'double');
  await expect(circles.nth(1)).toHaveAttribute('border-color', '#000080');

  await expect(circles.nth(2)).toHaveAttribute('border-width', '12px');
  await expect(circles.nth(2)).toHaveAttribute('border-style', 'dotted');
  await expect(circles.nth(2)).toHaveAttribute('border-color', 'deeppink');

  await expect(circles.nth(3)).toHaveAttribute('border-width', '12px');
  await expect(circles.nth(3)).toHaveAttribute('border-style', 'groove');
  await expect(circles.nth(3)).toHaveAttribute('border-color', 'green');
});