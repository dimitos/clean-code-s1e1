
var taskInput = document.getElementById("new-task");
var addButton = document.getElementsByTagName("button")[0];
var inCompleteTaskHolder = document.getElementById("in-complete-tasks");
var completedTasksHolder = document.getElementById("completed-tasks");

var createNewTaskElement = function(taskString) {
  var listItem = document.createElement("li");
  listItem.className = "tasks__item";
  var checkBox = document.createElement("input");
  var label = document.createElement("label");
  var editInput = document.createElement("input");
  var editButton = document.createElement("button");
  var deleteButton = document.createElement("button");
  var deleteButtonImg = document.createElement("img");

  label.innerText = taskString;
  label.className = "task";

  checkBox.type = "checkbox";
  checkBox.className = "input tasks__checkbox";

  editInput.type = "text";
  editInput.className = "input input__task";

  editButton.innerText = "Edit";
  editButton.className = "btn btn__dafault edit";

  deleteButton.className = "btn btn__dafault delete";
  deleteButtonImg.src = "./remove.svg";
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}

var addTask = function() {
  if (!taskInput.value) return;
  var listItem = createNewTaskElement(taskInput.value);
  inCompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = "";
}

var editTask = function() {
  var listItem = this.parentNode;
  var editInput = listItem.querySelector("input[type='text']");
  var label = listItem.querySelector("label");
  var editBtn = listItem.querySelector(".edit");
  var containsClass = listItem.classList.contains("task__edit-mode");

  if(containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  listItem.classList.toggle("task__edit-mode");
};

var deleteTask = function() {
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);
}

var taskCompleted = function() {
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

var taskIncomplete = function() {
  var listItem = this.parentNode;
  inCompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

var ajaxRequest = function() {
  console.log("AJAX Request");
}

addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {

  var checkBox = taskListItem.querySelector("input[type='checkbox']");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");

  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
}

for (var i=0; i < inCompleteTaskHolder.children.length; i++) {
  bindTaskEvents(inCompleteTaskHolder.children[i], taskCompleted);
}

for (var i=0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
