document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#new-todo-form");
  const list = document.querySelector("#todo-list");
  const input = document.querySelector("#new-todo");

  // sessionStorageからToDoリストを取得
  let todos = JSON.parse(sessionStorage.getItem('todos')) || [];
  // セッションストレージの内容をデバッグで確認
  console.log('Initial todos from sessionStorage:', todos);

  // ToDoリストを初期表示
  todos.forEach(todo => addTodoToList(todo.text, todo.completed));

  // フォーム送信時にToDoを追加
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const todoText = input.value.trim();
    if (todoText === "") return;

    addTodoToList(todoText, false);  // 新しいToDoをリストに追加 (完了状態はfalse)

    // 新しいToDoを配列に追加し、sessionStorageに保存
    todos.push({ text: todoText, completed: false });
    sessionStorage.setItem('todos', JSON.stringify(todos));

    input.value = "";  // 入力欄をクリア
  });

  // ToDoリストに項目を追加する関数
  function addTodoToList(text, completed) {
    const elem = document.createElement("li");
    const div = document.createElement("div");
    const label = document.createElement("label");
    label.textContent = text;
    label.style.textDecorationLine = completed ? "line-through" : "none";

    const toggle = document.createElement("input");
    toggle.type = "checkbox";
    toggle.checked = completed;
    toggle.addEventListener("change", () => {
      label.style.textDecorationLine = toggle.checked ? "line-through" : "none";
      updateTodoInStorage(text, toggle.checked);  // チェック状態が変わるとストレージも更新
    });

    const destroy = document.createElement("button");
    destroy.textContent = "❌";
    destroy.addEventListener("click", () => {
      elem.remove();
      removeTodoFromStorage(text);  // 削除時にストレージも更新
    });

    div.append(toggle, label, destroy);
    elem.appendChild(div);
    list.prepend(elem);
  }

  // sessionStorage内のToDo完了状態を更新
  function updateTodoInStorage(text, completed) {
    const todo = todos.find(todo => todo.text === text);
    if (todo) {
      todo.completed = completed;
      sessionStorage.setItem('todos', JSON.stringify(todos));
    }
  }

  // sessionStorageからToDoを削除
  function removeTodoFromStorage(text) {
    const index = todos.findIndex(todo => todo.text === text);
    if (index !== -1) {
      todos.splice(index, 1);
      sessionStorage.setItem('todos', JSON.stringify(todos));
    }
  }

  // storageイベントを利用して複数タブ間で同期
  window.addEventListener("storage", (e) => {     // sessionStorageに対する変更が別のタブやウィンドウで行われたときに起動
    if (e.key === 'todos') {
      todos = JSON.parse(e.newValue) || [];
      list.innerHTML = '';  // リストを一旦クリア
      todos.forEach(todo => addTodoToList(todo.text, todo.completed));  // 更新された内容を再描画
    }
  });
});