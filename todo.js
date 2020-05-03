const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input.todoInput"),
  PendingList = document.querySelector(".js-PendingList"),
  FinishedList = document.querySelector(".js-FinishedList");

let toDos = [];
let finished = [];

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  PendingList.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}
function deletefinishedToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  FinishedList.removeChild(li);
  const cleanToDos = finished.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  finished = cleanToDos;
  saveToDos();
}
function moveToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const span = li.querySelector("span");
  console.log("move!");
  deleteToDo(event);
  paintfinishedToDo(span.innerText);
}
function re_moveToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const span = li.querySelector("span");
  console.log("move!");
  deletefinishedToDo(event);
  paintToDo(span.innerText);
}
function saveToDos() {
  localStorage.setItem("PENDING", JSON.stringify(toDos));
  localStorage.setItem("FINISHED", JSON.stringify(finished));
}
function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const doneBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo);
  doneBtn.innerText = "✅";
  doneBtn.addEventListener("click", moveToDo);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(doneBtn);
  li.id = newId;
  PendingList.appendChild(li);
  const toDoObj = {
    id: newId,
    text: text,
  };
  toDos.push(toDoObj);
  saveToDos();
}

function paintfinishedToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const doneBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = finished.length + 1;
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deletefinishedToDo);
  doneBtn.innerText = "⏪";
  doneBtn.addEventListener("click", re_moveToDo);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(doneBtn);
  li.id = newId;
  FinishedList.appendChild(li);
  const toDoObj = {
    id: newId,
    text: text,
  };
  finished.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem("PENDING");
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
  const loadedfinsinedToDos = localStorage.getItem("FINISHED");
  if (loadedfinsinedToDos !== null) {
    const parsedToDos = JSON.parse(loadedfinsinedToDos);
    parsedToDos.forEach(function (toDo) {
      paintfinishedToDo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
