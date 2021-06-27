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
    " Friday 👍✌️",
    "Saturday ​🏠​🎊​🎶​",
  ];
  const randomWords = ["Enjoy your ", "Happy "];
  let todayDay = dayList[new Date().getDay()];

  today.innerText =
    randomWords[Math.floor(Math.random() * randomWords.length)] + todayDay;
})();

// Functions

function addTodo(e) {
  // Prevent natural behaviour
  try {
    e.preventDefault();
  } catch (err) {
    err = null;
  }

  if (todoInput.value !== "") {
    // Create list
    const newTodo = document.createElement("li");
    newTodo.innerHTML += '<span><input type="checkbox">'+'<p>'+todoInput.value+'</p>'+'<span>';
    newTodo.innerHTML += '<i class="fas fa-times remove-todo-btn" aria-hidden="true"></i>';
    newTodo.classList.add("todo-item");

    newTodo.addEventListener("click", e => {

      // add success class to todo
      if (!e.target.classList.contains("remove-todo-btn")) {
        console.log(e);
        newTodo.classList.toggle("completed");
      }

      // remove todo after animation
      else if (e.target.classList.contains("remove-todo-btn")){
        setTimeout(() => {
          e.target.parentElement.remove();
        }, 1400);
        e.target.parentElement.classList.add("remove-todo");
      }
    });
    todoList.appendChild(newTodo);
    todoInput.value = "";
  }
}

todoInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTodo();
  }
});