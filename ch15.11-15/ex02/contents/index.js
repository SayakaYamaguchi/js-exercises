const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOMContentLoaded event fired"); // デバッグ用ログ
  // TODO: ここで API を呼び出してタスク一覧を取得し、
  // 成功したら取得したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
  try {
    const response = await retryFetchWithTimeout(() => fetchWithTimeout("/api/tasks", { method: "GET" }), 3);
    if(response){
      const { items } = await response.json();
      console.log("Tasks received:", items); // デバッグ用ログ
      items.forEach((task) => appendToDoItem(task));
    }

  }catch(error){
    console.error("Failed to load tasks:", error);
    alert(`Failed to load tasks: ${error.message}`);
  }
});

form.addEventListener("submit", async (e) => {
  // TODO: ここで form のイベントのキャンセルを実施しなさい (なぜでしょう？)
  e.preventDefault(); // フォーム送信のデフォルト動作をキャンセル（ページリロード防止の為）

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
    setFormDisabled(true);  // 通信中はフォームを無効化
    const response = await retryFetchWithTimeout(() => fetchWithTimeout("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: todo }),
    }), 3);
    if(response){
      const task = await response.json();
      console.log("Task created:", task); // 追加: タスクの内容をコンソールに表示
      appendToDoItem(task); // 作成したタスクをリストに追加
    }

  } catch (error) {
    console.error("Failed to add task:", error);
    alert(`Failed to add task: ${error.message}`);
  }finally{
    setFormDisabled(false); // 通信終了後はフォームを有効化
  }
});

// リトライとタイムアウト処理を含むfetch関数
async function fetchWithTimeout(url, options = {}, timeout = 3000) {
  const controller = new AbortController();
  const signal = controller.signal;
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, { ...options, signal });
    clearTimeout(timer); // タイマーをクリア
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return response;
  } catch (error) {
    if (error.name === 'AbortError') {
      alert("Request timed out");
    }
    throw error; // 他のエラーはそのまま投げる
  }
}


// API から取得したタスクオブジェクトを受け取って、ToDo リストの要素を追加する
function appendToDoItem(task) {
  console.log("Appending task:", task); // デバッグ用ログ
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
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
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
      setFormDisabled(true);    // フォーム無効化（削除処理中）
      await retryFetchWithTimeout(async () => {
        const response = await fetch(`/api/tasks/${task.id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
      elem.remove(); // タスクをリストから削除
      return true; // 成功したことを示す
      }, 3);
    } catch (error) {
      console.error("Failed to delete task:", error);
      alert(`Failed to delete task: ${error.message}`);
    } finally {
      setFormDisabled(false); // フォームを再度有効化
    }
  });
  elem.append(toggle, label, destroy); // 要素をリストに追加
  // TODO: elem 内に toggle, label, destroy を追加しなさい
  list.prepend(elem);
}

// フォームの無効化と有効化 
function setFormDisabled(disabled){
  input.disabled = disabled;
  form.querySelector("button").disabled = disabled;
}

// 問題 11.16 リトライ関数呼び出し
async function retryFetchWithTimeout(fetchFunc, maxRetry) {
  return new Promise((resolve, reject) => {
    retryWithExponentialBackoff(async () => {
      try {
        const response = await fetchFunc();
        if (response && response.ok) {
          resolve(response); // 成功時にレスポンスを返す
        }
      } catch (error) {
        return null; // リトライ続行
      }
    }, maxRetry, (result) => {
      if (result) {
        resolve(result); // 最終的な結果を解決
      } else {
        reject(new Error("Failed after maximum retries")); // リトライ失敗時のエラー処理
      }
    });
  });
}

// 問題 11.16 リトライ関数
export function retryWithExponentialBackoff(func, maxRetry, callback) {
  let attempt = 0;

  async function executeFunction() {
    try {
      const result = await func();  // 非同期処理の結果を待つ
      if (result) {
        console.log(`Retry attempt ${attempt} succeeded`);
        callback(true);
      } else {
        retry();
      }
    } catch (error) {
      retry();
    }
  }

  function retry() {
    attempt++;
    if (attempt <= maxRetry) {
      const delay = Math.pow(2, attempt - 1) * 1000; // attemptは1から始まるので、attempt - 1で待ち時間を計算
      console.log(`Retry attempt ${attempt} failed. Retrying in ${delay}ms`);
      setTimeout(executeFunction, delay);
    } else {
      console.log(`All retry attempts failed after ${attempt} tries`);
      callback(false);
    }
  }

  executeFunction();
}