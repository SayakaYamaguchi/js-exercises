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

test.describe('ToDoアプリ（セッションストレージ）テスト', () => {

  test('ToDoが追加され、sessionStorageに保存される', async ({ page }) => {
    // ページをロード
    await page.goto('http://localhost:5500/ch15.11-15/ex06/'); // 適切なURLに置き換えてください

    // ToDoを追加
    await addToDo(page, 'Test ToDo');

    // リストにToDoが追加されているか確認
    const listItem = await page.getByRole('listitem').first();
    await expect(listItem).toContainText('Test ToDo');

    // sessionStorageに正しく保存されているか確認
    const todos = await page.evaluate(() => JSON.parse(sessionStorage.getItem('todos')));
    expect(todos.length).toBe(1);
    expect(todos[0].text).toBe('Test ToDo');
  });

  test('ToDoの完了状態が変更されるとsessionStorageが更新される', async ({ page }) => {
    // ページをロード
    await page.goto('http://localhost:5500/ch15.11-15/ex06/');

    // ToDoを追加
    await addToDo(page, 'Complete Me');

    // チェックボックスを操作
    const checkbox = await page.getByRole('checkbox').first();
    await checkbox.check();

    // sessionStorageに完了状態が保存されているか確認
    const todos = await page.evaluate(() => JSON.parse(sessionStorage.getItem('todos')));
    expect(todos[0].completed).toBe(true);
  });

  test('ToDoが削除されるとsessionStorageからも削除される', async ({ page }) => {
    // ページをロード
    await page.goto('http://localhost:5500/ch15.11-15/ex06/');

    // ToDoを追加
    await addToDo(page, 'Delete Me');

    // 削除ボタンをクリック
    const deleteButton = await page.getByRole('button', { name: '❌' }).first();
    await deleteButton.click();

    // リストが空であることを確認
    const listItems = await page.getByRole('listitem');
    await expect(listItems).toHaveCount(0);

    // sessionStorageにToDoが残っていないことを確認
    const todos = await page.evaluate(() => JSON.parse(sessionStorage.getItem('todos')));
    expect(todos.length).toBe(0);
  });

  test('ページをリロードしてもセッション内ではToDoリストが保持される', async ({ page }) => {
    // ページをロード
    await page.goto('http://localhost:5500/ch15.11-15/ex06/');

    // ToDoを追加
    await addToDo(page, 'Stay After Reload');

    // ページをリロード
    await page.reload();

    // リロード後もToDoが保持されていることを確認
    const listItem = await page.getByRole('listitem').first();
    await expect(listItem).toContainText('Stay After Reload');
  });

  test('新しいタブを開くとセッションストレージのデータは存在しない', async ({ page, context }) => {
    // ページをロード
    await page.goto('http://localhost:5500/ch15.11-15/ex06/');

    // ToDoを追加
    await addToDo(page, 'Temporary ToDo');

    // 新しいタブを開く
    const newPage = await context.newPage();
    await newPage.goto('http://localhost:5500/ch15.11-15/ex06/');

    // 新しいタブではToDoリストが存在しないことを確認
    const listItems = await newPage.getByRole('listitem');
    await expect(listItems).toHaveCount(0);

    // sessionStorageにもデータが存在しないことを確認
    const todos = await newPage.evaluate(() => sessionStorage.getItem('todos'));
    expect(todos).toBeNull();
  });

});