import React, { useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]); // ToDoリストの状態管理
  const [newTodo, setNewTodo] = useState(''); // 新しいToDoの入力状態

  // ToDoを追加する関数
  const addTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim() === '') return; // 空白を除去して空の場合は何もしない

    const newTask = {
      id: Date.now(),
      text: newTodo.trim(),
      completed: false,
    };

    setTodos([newTask, ...todos]);
    setNewTodo(''); // 入力フィールドをクリア
  };

  // ToDoの完了状態を切り替える関数
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // ToDoを削除する関数
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Simple ToDo</h1>
      <form onSubmit={addTodo}>
        <input
          type="text"
          placeholder="What needs to be done?"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <button type="submit">Add</button>
      </form>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map((todo) => (
          <li key={todo.id} style={{ margin: '10px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                style={{ marginRight: '10px' }}
              />
              <label
                style={{
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  flex: 1,
                }}
              >
                {todo.text}
              </label>
              <button
                onClick={() => deleteTodo(todo.id)}
                style={{ marginLeft: '10px' }}
              >
                ❌
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
