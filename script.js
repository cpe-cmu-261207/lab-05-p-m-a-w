const inputAdd = document.getElementById("input-add-todo");
const todoCtn = document.getElementById("todo-container");
const localStorageName = "setyorsoodtorsoodporcmorsonghorsaikai";

inputAdd.onkeyup = (event) => {
  if (event.key !== "Enter") return;
  const val = inputAdd.value;
  if (val == "") {
    alert("Todo cannot be empty");
    return;
  }
  addTodo(val, false);
  saveTodo();
};

function addTodo(title, completed) {
  //create a div that holds todo title, done button, delete button
  const div = document.createElement("div");
  div.className = "border-bottom p-1 py-2 fs-2 d-flex";

  //create span for showing title
  const span = document.createElement("span");
  span.innerText = title;
  span.style.textDecoration = completed ? "line-through" : "";
  span.className = "me-3";

  //create done button
  const doneBtn = document.createElement("button");
  doneBtn.innerText = "Done";
  doneBtn.className = "btn btn-success me-2";

  //create delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.className = "btn btn-danger";

  //your code here
  div.appendChild(span);
  div.appendChild(doneBtn);
  div.appendChild(deleteBtn);
  doneBtn.onclick = () => {
    completed = !completed;
    span.style.textDecoration = completed ? "line-through" : "";
    saveTodo();
  };
  deleteBtn.onclick = () => {
    todoCtn.removeChild(div);
    saveTodo();
  };
  todoCtn.insertBefore(div, todoCtn.firstChild);
}

function saveTodo() {
  const data = [];
  for (const todoDiv of todoCtn.children) {
    data.push({
      title: todoDiv.children[0].innerText,
      completed: todoDiv.children[0].style.textDecoration === "line-through",
    });
  }
  localStorage.setItem(localStorageName, JSON.stringify(data));
}

function loadTodo() {
  const data = JSON.parse(localStorage.getItem(localStorageName));
  for (const todo of data) {
    addTodo(todo.title, todo.completed);
  }
}

loadTodo();
