// DOM Variables
const todoInput = document.querySelector(".todo-input");
const addBtn = document.querySelector(".add-todo");
const todoList = document.querySelector(".todo");

// Event Listeners
addBtn.addEventListener("click", addTodo);

// Calling function right after Declaring it
(todayText = () => {
  const today = document.getElementById("today");
  const dayList = [
    "Sunday 😃",
    "Monday 😭",
    "Tuesday 😃",
    "Wednesday 😃",
    "Thursday 😃",
    "Friday 👍✌️",
    "Saturday ​🏠​🎊​🎶​",
  ];
  const randomWords = ["Enjoy your ", "Happy "];
  let todayDay = dayList[new Date().getDay()];

  today.innerText =
    randomWords[Math.floor(Math.random() * randomWords.length)] + todayDay;
})();

// Functions

function addTodo() {
  if (todoInput.value !== "") {
    // Create list
    const newTodo = document.createElement("li");
    newTodo.innerHTML += '<span><i class="checkbox far fa-circle"></i>'+'<p>'+todoInput.value+'</p>'+'</span>';
    newTodo.innerHTML += '<i class="btn fas fa-times remove-todo-btn" aria-hidden="true"></i>';
    newTodo.classList.add("todo-item", "container");

    newTodo.addEventListener("click", (e) => {
      // add success class to todo
      if (!e.target.classList.contains("remove-todo-btn")) {
        newTodo.classList.toggle("completed");

        // changing the check icon
        const checkboxIcon = e.target.closest("li").querySelector(".checkbox");
        checkboxIcon.classList.toggle("fas");
        checkboxIcon.classList.toggle("far");
        checkboxIcon.classList.toggle("fa-check");
        checkboxIcon.classList.toggle("fa-circle");
      }
      // remove todo after animation
      else if (e.target.classList.contains("remove-todo-btn")) {
        setTimeout(() => {
          e.target.parentElement.remove();
          updateLocalStorage();
        }, 990);
        e.target.parentElement.classList.remove("completed");
        e.target.parentElement.classList.add("remove-todo");
      }
    });

    todoList.appendChild(newTodo);
    todoInput.value = "";

    updateLocalStorage();
  }
}

function updateLocalStorage() {
  const todos = Array.from(todoList.getElementsByTagName("li")).map((todo) => ({
    text: todo.querySelector("p").innerText,
    completed: todo.classList.contains("completed"),
  }));

  localStorage.setItem("todos", JSON.stringify(todos));
}

function restoreTodos() {
  const todos = JSON.parse(localStorage.getItem("todos"));
  if (todos) {
    todos.forEach((todo) => {
      const newTodo = document.createElement("li");
      newTodo.innerHTML += '<span><i class="checkbox far fa-circle"></i>'+'<p>'+todo.text+'</p>'+'</span>';
      newTodo.innerHTML += '<i class="btn fas fa-times remove-todo-btn" aria-hidden="true"></i>';
      newTodo.classList.add("todo-item", "container");

      if (todo.completed) {
        newTodo.classList.add("completed");
        const checkboxIcon = newTodo.querySelector(".checkbox");
        checkboxIcon.classList.toggle("fas");
        checkboxIcon.classList.toggle("far");
        checkboxIcon.classList.toggle("fa-check");
        checkboxIcon.classList.toggle("fa-circle");
      }

      newTodo.addEventListener("click", (e) => {
        // add success class to todo
        if (!e.target.classList.contains("remove-todo-btn")) {
          newTodo.classList.toggle("completed");

          // changing the check icon
          const checkboxIcon = e.target.closest("li").querySelector(".checkbox");
          checkboxIcon.classList.toggle("fas");
          checkboxIcon.classList.toggle("far");
          checkboxIcon.classList.toggle("fa-check");
          checkboxIcon.classList.toggle("fa-circle");
        }
        // remove todo after animation
        else if (e.target.classList.contains("remove-todo-btn")) {
          setTimeout(() => {
            e.target.parentElement.remove();
            updateLocalStorage();
          }, 990);
          e.target.parentElement.classList.remove("completed");
          e.target.parentElement.classList.add("remove-todo");
        }
      });

      todoList.appendChild(newTodo);
    });
  }
}

document.addEventListener("DOMContentLoaded", restoreTodos);

todoInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTodo();
  }
});