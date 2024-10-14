// import { error } from "console";

document.addEventListener("DOMContentLoaded",()=>{
  fetch("./todoData.json")
  .then(response => response.json())
    .then(data => {
      data.forEach(item => {
        addTodo(item.content);  // item.content を渡す
      });
    })
    .catch(error => console.error("Error loading todo data:", error));
});

const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");
const template = document.querySelector("#todo-template");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value.trim() === "") {
    return;
  }
  addTodo(input.value.trim());  // input.value を addTodo に渡す
  input.value = "";
});

function addTodo(content) {
  const clone = template.content.cloneNode(true);
  const li = clone.querySelector("li");
  const toggle = clone.querySelector("input");
  const label = clone.querySelector("label");
  const destroy = clone.querySelector("button");

  label.textContent = content;  // content を設定

  toggle.addEventListener("change", () => {
    li.classList.toggle("completed", toggle.checked);
  });

  destroy.addEventListener("click", () => {
    li.remove();
  });

  list.prepend(li);
}