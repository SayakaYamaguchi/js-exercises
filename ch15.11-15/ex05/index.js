document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#new-todo-form");
  const list = document.querySelector("#todo-list");
  const input = document.querySelector("#new-todo");

  let db;

  // IndexedDBの初期化
  const request = indexedDB.open("todoApp", 1);

  request.onerror = function () {
    console.error("データベースの初期化に失敗しました");
  };

  request.onsuccess = function (event) {
    db = event.target.result;
    loadTodosFromDB();
  };

  request.onupgradeneeded = function (event) {
    db = event.target.result;
    const objectStore = db.createObjectStore("todos", { keyPath: "id", autoIncrement: true });
    objectStore.createIndex("text", "text", { unique: false });
    objectStore.createIndex("completed", "completed", { unique: false });
  };

  // IndexedDBからToDoリストを読み込む
  function loadTodosFromDB() {
    const transaction = db.transaction("todos", "readonly");
    const objectStore = transaction.objectStore("todos");
    const request = objectStore.getAll();

    request.onsuccess = function (event) {
      const todos = event.target.result;
      todos.forEach(todo => addTodoToList(todo.text, todo.completed, todo.id));
    };
  }

  // フォーム送信時にToDoを追加
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const todoText = input.value.trim();
    if (todoText === "") return;

    // ToDoをIndexedDBに保存
    const transaction = db.transaction("todos", "readwrite");
    const objectStore = transaction.objectStore("todos");
    const request = objectStore.add({ text: todoText, completed: false });

    request.onsuccess = function (event) {
      const todoId = event.target.result;
      addTodoToList(todoText, false, todoId);  // 新しいToDoをリストに追加
      notifyTodoUpdate();  // ToDo追加後に変更を通知
    };

    input.value = "";  // 入力欄をクリア
  });

  // ToDoリストに項目を追加する関数
  function addTodoToList(text, completed, id) {
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
      updateTodoInDB(id, toggle.checked);  // チェック状態をIndexedDBに更新
    });

    const destroy = document.createElement("button");
    destroy.textContent = "❌";
    destroy.addEventListener("click", () => {
      elem.remove();
      removeTodoFromDB(id);  // 削除時にIndexedDBからも削除
    });

    div.append(toggle, label, destroy);
    elem.appendChild(div);
    list.prepend(elem);
  }

  // IndexedDB内のToDo完了状態を更新
  function updateTodoInDB(id, completed) {
    const transaction = db.transaction("todos", "readwrite");
    const objectStore = transaction.objectStore("todos");
    const request = objectStore.get(id);

    request.onsuccess = function (event) {
      const todo = event.target.result;
      todo.completed = completed;

      const updateRequest = objectStore.put(todo);
      updateRequest.onsuccess = function () {
        console.log(`ToDo ID: ${id}が更新されました`);
        notifyTodoUpdate();  // ToDo更新後に変更を通知
      };
    };
  }

  // IndexedDBからToDoを削除
  function removeTodoFromDB(id) {
    const transaction = db.transaction("todos", "readwrite");
    const objectStore = transaction.objectStore("todos");
    const request = objectStore.delete(id);

    request.onsuccess = function () {
      console.log(`ToDo ID: ${id}が削除されました`);
      notifyTodoUpdate();  // ToDo削除後に変更を通知
    };
  }

  // storageイベントを利用して複数タブ間で同期
  window.addEventListener("storage", (e) => {
    if (e.key === 'todos-updated') {
      loadTodosFromDB();  // 更新されたToDoリストを再描画
    }
  });

  // ToDoリストの更新を通知
  function notifyTodoUpdate() {
    localStorage.setItem('todos-updated', Date.now());
    localStorage.removeItem('todos-updated');  // クリーンアップ
  }
});
