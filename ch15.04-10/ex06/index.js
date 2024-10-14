const template = document.createElement("template");
template.innerHTML = `\
<style>
.completed {
  text-decoration: line-through;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: flex;
  align-items: center;
}
button {
  margin-left: 10px;
}
</style>

<form id="new-todo-form">
  <input type="text" id="new-todo" placeholder="What needs to be done?" />
  <button type="submit">Add</button>
</form>
<ul id="todo-list"></ul>
`;

class TodoApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // フォームとリスト要素を取得
    this.form = this.shadowRoot.querySelector("#new-todo-form");
    // TODO: 残りを実装
    this.todoList = this.shadowRoot.querySelector("#todo-list");

    // イベントリスナーを設定
    this.form.addEventListener("submit", (e) => this.addTodo(e));
  }

  // ToDoアイテムを追加する関数
  addTodo(e) {
    e.preventDefault();
  
    const input = this.shadowRoot.querySelector("#new-todo");
    const value = input.value.trim();

    if (value === "") return;

    // 新しいToDoアイテムを作成
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    // チェックボックスのイベントリスナー
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        li.classList.add("completed");
      } else {
        li.classList.remove("completed");
      }
    });

    // ToDo内容のテキストノード
    const text = document.createTextNode(value);
    
    // 削除ボタンを作成
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    // 削除ボタンのイベントリスナー
    deleteButton.addEventListener("click", () => {
      this.todoList.removeChild(li);
    });

    // li要素にチェックボックス、テキスト、削除ボタンを追加
    li.appendChild(checkbox);
    li.appendChild(text);
    li.appendChild(deleteButton);

    // ToDoリストに新しいアイテムを追加
    this.todoList.appendChild(li);

    // フォームをリセット
    input.value = "";

  }
}

customElements.define("todo-app", TodoApp);
