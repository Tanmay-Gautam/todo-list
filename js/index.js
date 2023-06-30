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
    newTodo.innerHTML += `<span><i class="checkbox far fa-circle"></i><p>${todoInput.value}</p></span>`;
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

        // remove todo after animation
        updateLocalStorage();
      } else if (e.target.classList.contains("remove-todo-btn")) {
        setTimeout(() => {
          e.target.parentElement.remove();
          updateLocalStorage();
        }, 750);
        e.target.parentElement.classList.remove("completed");
        e.target.parentElement.classList.add("remove-todo");
      }
    });

    todoList.appendChild(newTodo);
    updateLocalStorage();
    todoInput.value = "";
  }
}

function updateLocalStorage() {
  const todos = document.querySelectorAll(".todo-item");

  const todoList = [];

  todos.forEach((todo) => {
    const todoText = todo.querySelector("p").innerText;
    const isCompleted = todo.classList.contains("completed");

    todoList.push({ text: todoText, completed: isCompleted });
  });

  localStorage.setItem("todos", JSON.stringify(todoList));
}

function restoreTodos() {
  const storedTodos = localStorage.getItem("todos");

  if (storedTodos) {
    const todoListElement = document.querySelector(".todo");
    const todoList = JSON.parse(storedTodos);

    todoList.forEach((todo) => {
      const newTodo = document.createElement("li");
      newTodo.innerHTML += `<span><i class="checkbox far ${todo.completed ? "fa-check" : "fa-circle"}"></i><p>${todo.text}</p></span>`;
      newTodo.innerHTML += '<i class="btn fas fa-times remove-todo-btn" aria-hidden="true"></i>';
      newTodo.classList.add("todo-item", "container");
      if (todo.completed) {
        newTodo.classList.add("completed");
      }

      newTodo.addEventListener("click", (e) => {
        if (!e.target.classList.contains("remove-todo-btn")) {
          newTodo.classList.toggle("completed");

          const checkboxIcon = e.target.closest("li").querySelector(".checkbox");
          checkboxIcon.classList.toggle("fas");
          checkboxIcon.classList.toggle("far");
          checkboxIcon.classList.toggle("fa-check");
          checkboxIcon.classList.toggle("fa-circle");

          updateLocalStorage();
        } else if (e.target.classList.contains("remove-todo-btn")) {
          setTimeout(() => {
            e.target.parentElement.remove();
            updateLocalStorage();
          }, 990);
          e.target.parentElement.classList.remove("completed");
          e.target.parentElement.classList.add("remove-todo");
        }
      });

      todoListElement.appendChild(newTodo);
    });
  }
}

// Restore todos on page load
document.addEventListener("DOMContentLoaded", restoreTodos);

todoInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTodo();
  }
});
