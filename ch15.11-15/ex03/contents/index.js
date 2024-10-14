const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

document.addEventListener("DOMContentLoaded", async () => {
  // TODO: ここで API を呼び出してタスク一覧を取得し、
  // 成功したら取得したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
  try {
    const response = await fetch("http://localhost:3001/api/tasks", {
      method: "GET",
      credentials: "include", // クッキーを含むリクエストを許可
    });
    if (!response.ok){
      throw new Error('Error: ${response.statusText}');
    }
    const { items } = await response.json();
    items.forEach((task) => appendToDoItem(task));
  }catch(error){
    console.error("Failed to load tasks:", error);
    alert(`Failed to load tasks: ${error.message}`);
  }
});

form.addEventListener("submit", async (e) => {
  // TODO: ここで form のイベントのキャンセルを実施しなさい (なぜでしょう？)
  e.preventDefault(); // フォーム送信のデフォルト動作をキャンセル（ページリロード防止）

  // 両端からホワイトスペースを取り除いた文字列を取得する
  const todo = input.value.trim();
  if (todo === "") {
    return;
  }

  // new-todo の中身は空にする
  input.value = "";

  // TODO: ここで API を呼び出して新しいタスクを作成し
  // 成功したら作成したタスクを appendToDoElement で ToDo リストの要素として追加しなさい
  try {
    const response = await fetch("http://localhost:3001/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: todo }),
      credentials: "include", // クッキーを含むリクエストを許可
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const task = await response.json();
    appendToDoItem(task); // 作成したタスクをリストに追加
  } catch (error) {
    console.error("Failed to add task:", error);
    alert(`Failed to add task: ${error.message}`);
  }
});

// API から取得したタスクオブジェクトを受け取って、ToDo リストの要素を追加する
function appendToDoItem(task) {
  // ここから #todo-list に追加する要素を構築する
  const elem = document.createElement("li");

  const label = document.createElement("label");
  label.textContent = task.name;
  label.style.textDecorationLine = "none";

  const toggle = document.createElement("input");
  // TODO: toggle が変化 (change) した際に API を呼び出してタスクの状態を更新し
  // 成功したら label.style.textDecorationLine を変更しなさい
  toggle.type = "checkbox";
  toggle.checked = task.status === "completed";
  toggle.addEventListener("change", async() => {
    const newStatus = toggle.checked ? "completed" : "active"
    try {
      const response = await fetch(`http://localhost:3001/api/tasks/${task.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
        credentials: "include", // クッキーを含むリクエストを許可
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      label.style.textDecorationLine = newStatus === "completed" ? "line-through" : "none";
    } catch (error) {
      console.error("Failed to update task:", error);
      alert(`Failed to update task: ${error.message}`);
    }
  });

  const destroy = document.createElement("button");
  // TODO: destroy がクリック (click) された場合に API を呼び出してタスク を削除し
  // 成功したら elem を削除しなさい
  destroy.textContent = "Delete";
  destroy.addEventListener("click", async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/tasks/${task.id}`, {
        method: "DELETE",
        credentials: "include", // クッキーを含むリクエストを許可
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      elem.remove(); // タスクをリストから削除
    } catch (error) {
      console.error("Failed to delete task:", error);
      alert(`Failed to delete task: ${error.message}`);
    }
  });
  elem.append(toggle, label, destroy); // 要素をリストに追加
  // TODO: elem 内に toggle, label, destroy を追加しなさい
  list.prepend(elem);
}

