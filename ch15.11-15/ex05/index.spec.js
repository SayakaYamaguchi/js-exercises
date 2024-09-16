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

/**
 * IndexedDBからToDoリストを取得する関数
 * @param {import("@playwright/test").Page} page
 */
async function getTodosFromIndexedDB(page) {
  return await page.evaluate(() => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("todoApp", 1);
      request.onerror = () => reject("IndexedDB failed to open");
      request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction("todos", "readonly");
        const objectStore = transaction.objectStore("todos");
        const getAllRequest = objectStore.getAll();

        getAllRequest.onsuccess = () => resolve(getAllRequest.result);
        getAllRequest.onerror = () => reject("Failed to retrieve todos");
      };
    });
  });
}

test.describe('IndexedDBを使用したToDoアプリのテスト', () => {

  test('ToDoが追加され、IndexedDBに保存される', async ({ page }) => {
    // ページをロード
    await page.goto('http://localhost:5500/ch15.11-15/ex05/'); // 適切なURLに置き換えてください

    // ToDoを追加
    await addToDo(page, 'Test ToDo');

    // リストにToDoが追加されているか確認
    const listItem = await page.getByRole('listitem').first();
    await expect(listItem).toContainText('Test ToDo');

    // IndexedDBに保存されているToDoを確認
    const todos = await getTodosFromIndexedDB(page);
    expect(todos.length).toBe(1);
    expect(todos[0].text).toBe('Test ToDo');
  });

  test('ToDoの完了状態が変更されるとIndexedDBが更新される', async ({ page }) => {
    // ページをロード
    await page.goto('http://localhost:5500/ch15.11-15/ex05/');

    // ToDoを追加
    await addToDo(page, 'Complete Me');

    // チェックボックスを操作
    const checkbox = await page.getByRole('checkbox').first();
    await checkbox.check();

    // IndexedDBの完了状態を確認
    const todos = await getTodosFromIndexedDB(page);
    expect(todos[0].completed).toBe(true);
  });

  test('ToDoが削除されるとIndexedDBからも削除される', async ({ page }) => {
    // ページをロード
    await page.goto('http://localhost:5500/ch15.11-15/ex05/');

    // ToDoを追加
    await addToDo(page, 'Delete Me');

    // 削除ボタンをクリック
    const deleteButton = await page.getByRole('button', { name: '❌' }).first();
    await deleteButton.click();

    // リストが空であることを確認
    const listItems = await page.getByRole('listitem');
    await expect(listItems).toHaveCount(0);

    // IndexedDBにToDoが残っていないことを確認
    const todos = await getTodosFromIndexedDB(page);
    expect(todos.length).toBe(0);
  });

  test('ページをリロードしてもIndexedDB内のToDoリストが保持される', async ({ page }) => {
    // ページをロード
    await page.goto('http://localhost:5500/ch15.11-15/ex05/');

    // ToDoを追加
    await addToDo(page, 'Persist After Reload');

    // ページをリロード
    await page.reload();

    // リロード後もToDoが保持されていることを確認
    const listItem = await page.getByRole('listitem').first();
    await expect(listItem).toContainText('Persist After Reload');

    // IndexedDBのデータを確認
    const todos = await getTodosFromIndexedDB(page);
    expect(todos.length).toBe(1);
    expect(todos[0].text).toBe('Persist After Reload');
  });

  test('複数タブ間でIndexedDBが同期される', async ({ page, context }) => {
    // ページをロード
    await page.goto('http://localhost:5500/ch15.11-15/ex05/');

    // ToDoを追加
    await addToDo(page, 'Sync Me');

    // 新しいタブを開く
    const newPage = await context.newPage();
    await newPage.goto('http://localhost:5500/ch15.11-15/ex05/');

    // 新しいタブでToDoリストが同期されていることを確認
    const listItem = await newPage.getByRole('listitem').first();
    await expect(listItem).toContainText('Sync Me');

    // 新しいタブのIndexedDBのデータを確認
    const todos = await getTodosFromIndexedDB(newPage);
    expect(todos.length).toBe(1);
    expect(todos[0].text).toBe('Sync Me');
  });
});
