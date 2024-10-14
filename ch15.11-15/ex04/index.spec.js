import { expect, test } from "@playwright/test";
/**
 * ToDoを追加する関数
 * @param {import("@playwright/test").Page} page
 * @param {string} todo
 */
async function addToDo(page, todo) {
  await page.getByRole("textbox").fill(todo);
  await page.getByRole("button", { name: "Add" }).click();
}

test.describe('ToDoアプリのテスト', () => {
  
  test('ToDoが追加され、localStorageに保存される', async ({ page }) => {
    // ページをロード
    await page.goto('http://localhost:5500/ch15.11-15/ex04/'); // 適切なURLに置き換えてください

    // ToDoを追加
    await addToDo(page, 'Test ToDo');

    // リストにToDoが追加されているか確認
    const listItem = await page.getByRole('listitem').first();
    await expect(listItem).toContainText('Test ToDo');

    // localStorageに正しく保存されているか確認
    const todos = await page.evaluate(() => JSON.parse(localStorage.getItem('todos')));
    expect(todos.length).toBe(1);
    expect(todos[0].text).toBe('Test ToDo');
  });

  test('ToDoの完了状態が変更されるとlocalStorageが更新される', async ({ page }) => {
    // ページをロード
    await page.goto('http://localhost:5500/ch15.11-15/ex04/');

    // ToDoを追加
    await addToDo(page, 'Complete Me');

    // チェックボックスを操作
    const checkbox = await page.getByRole('checkbox').first();
    await checkbox.check();

    // localStorageに完了状態が保存されているか確認
    const todos = await page.evaluate(() => JSON.parse(localStorage.getItem('todos')));
    expect(todos[0].completed).toBe(true);
  });

  test('ToDoが削除されるとlocalStorageからも削除される', async ({ page }) => {
    // ページをロード
    await page.goto('http://localhost:5500/ch15.11-15/ex04/');

    // ToDoを追加
    await addToDo(page, 'Delete Me');

    // 削除ボタンをクリック
    const deleteButton = await page.getByRole('button', { name: '❌' }).first();
    await deleteButton.click();

    // リストが空であることを確認
    const listItems = await page.getByRole('listitem');
    await expect(listItems).toHaveCount(0);

    // localStorageにToDoが残っていないことを確認
    const todos = await page.evaluate(() => JSON.parse(localStorage.getItem('todos')));
    expect(todos.length).toBe(0);
  });

  test('複数タブ間でToDoリストが同期される', async ({ page, context }) => {
    // ページをロード
    await page.goto('http://localhost:5500/ch15.11-15/ex04/');

    // ToDoを追加
    await addToDo(page, 'Sync Me');

    // 新しいタブを開く
    const newPage = await context.newPage();
    await newPage.goto('http://localhost:5500/ch15.11-15/ex04/');

    // 新しいタブでToDoリストが同期されていることを確認
    const listItem = await newPage.getByRole('listitem').first();
    await expect(listItem).toContainText('Sync Me');
  });
});