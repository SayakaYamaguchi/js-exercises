import { test, expect } from '@playwright/test';

test('ToDoアプリ - タスクの追加', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/ch15.04-10/ex11/index.html');

  // input フィールドにタスクを入力する
  const input = await page.locator('#new-todo');
  await input.fill('Test Playwright Task');

  // Add ボタンをクリックしてタスクを追加
  await page.click('button');

  // タスクがリストに追加されるまで待機する
  await page.waitForSelector('#todo-list li');

  // タスクがリストに追加されたか確認する
  const todoItem = await page.locator('#todo-list li');
  await expect(todoItem).toContainText('Test Playwright Task');
});

test('ToDoアプリ - タスクのフィルタリングとスタイル確認', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/ch15.04-10/ex11/index.html');

  // 1つ目のタスク「あいうえお」を追加
  const input = await page.locator('#new-todo');
  await input.fill('あいうえお');
  await page.click('button');

  // 2つ目のタスク「ABCDE」を追加
  await input.fill('ABCDE');
  await page.click('button');

  // 「あいうえお」にチェックを入れる
  const firstTodoCheckbox = await page.locator('#todo-list li:nth-child(1) .toggle');
  await firstTodoCheckbox.check();

  // スタイルを確認 (色とテキスト装飾)
  const firstTodoLabel = await page.locator('#todo-list li:nth-child(1) .content');
  await expect(firstTodoLabel).toHaveCSS('color', 'rgb(187, 187, 187)');
  await expect(firstTodoLabel).toHaveCSS('text-decoration-line', 'line-through');

  // 「Active」をクリックして「ABCDE」だけが表示されることを確認
  await page.click('footer a[href="#/active"]');
  const activeTodos = await page.locator('#todo-list li');
  await expect(activeTodos).toHaveCount(1);
  await expect(activeTodos.first()).toContainText('ABCDE');

  // 「Completed」をクリックして「あいうえお」だけが表示されることを確認
  await page.click('footer a[href="#/completed"]');
  const completedTodos = await page.locator('#todo-list li');
  await expect(completedTodos).toHaveCount(1);
  await expect(completedTodos.first()).toContainText('あいうえお');

  // 「All」をクリックして両方のタスクが表示されることを確認
  await page.click('footer a[href="#/"]');
  const allTodos = await page.locator('#todo-list li');
  await expect(allTodos).toHaveCount(2);
  await expect(allTodos.nth(0)).toContainText('あいうえお');
  await expect(allTodos.nth(1)).toContainText('ABCDE');
});

test('ToDoアプリ - 異常系テストケース', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/ch15.04-10/ex11/index.html');

  // 異常系テストケース 1: 空のタスクを追加しようとする
  const input = await page.locator('#new-todo');
  await input.fill('');  // 空の入力
  await page.click('button');

  // タスクリストが空であることを確認
  const todoItems = await page.locator('#todo-list li');
  await expect(todoItems).toHaveCount(0);

  // 異常系テストケース 2: 同じタスクを2回追加する
  await input.fill('同じタスク');
  await page.click('button');
  await input.fill('同じタスク');  // 同じタスクを追加
  await page.click('button');

  // タスクが2つ表示される（アプリが重複タスクを許可している場合）
  await expect(todoItems).toHaveCount(2);
  await expect(todoItems.nth(0)).toContainText('同じタスク');
  await expect(todoItems.nth(1)).toContainText('同じタスク');


});