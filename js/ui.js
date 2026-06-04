import { saveItem, getItem, deleteItem } from "./storage.js";

let inputValue;
let container;

//function to build a todo card with a header, delete button, and date
function buildTodoCard(todo) {
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card");

  // add a div element to hold the header and delete button
  const Divholder = document.createElement("div");
  Divholder.classList.add("div-holder");

  const header = document.createElement("p");
  header.textContent = todo;
  Divholder.appendChild(header);
  cardDiv.appendChild(Divholder);

  const footer = document.createElement("div");
  footer.classList.add("footer");
  const deleteIcon = document.createElement("span");
  deleteIcon.classList.add("delete-icon");
  deleteIcon.innerHTML = `<i class='fas fa-trash'></i>`;
  footer.appendChild(deleteIcon);

  deleteIcon.addEventListener("click", () => {
    deleteItem(todo);
    cardDiv.remove();
  });
  
  // add div element to hold the date
  const date = document.createElement("small");
  const currentDate = new Date();
  date.textContent = currentDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  footer.appendChild(date);
  cardDiv.appendChild(footer);

  return cardDiv;
}



// function to show an error message when the input is empty
export function showInputMessage() {
  const errorMessage = document.getElementById("error-message") || document.createElement("div");
  errorMessage.id = "error-message";
  errorMessage.classList.add("error-message");
  errorMessage.textContent = "Input is empty";
  errorMessage.style.display = "flex";

  const icon = document.createElement("span");
  icon.classList.add("error-icon");
  icon.innerHTML = `<i class='fas fa-exclamation-circle'></i>`;
  errorMessage.appendChild(icon);

  if (!document.getElementById("error-message")) {
    container.parentElement.insertBefore(errorMessage, container);
  }

  setTimeout(() => {
    removeErrorMessage();
  }, 3000);
}

export function removeErrorMessage() {
  const existing = document.getElementById("error-message");
  if (existing) {
    existing.remove();
  }
}


// function removeErrorMessage() {
//   const existing = document.getElementById("error-message");
//   if (existing) {
//     existing.remove();
//   }
// }

// function create call others functions to create a todo card, save it to local storage, and clear the input field
export function createElement() {
  if (!inputValue || !container) {
    console.error("Input or container not found");
    return;
  }

  const value = inputValue.value.trim();
  if (!value) {
    showInputMessage();
    return;
  }

  removeErrorMessage();

  const cardDiv = buildTodoCard(value);
  container.appendChild(cardDiv);
  saveItem(value);
  inputValue.value = "";

}

// Load and display todos on page load
window.addEventListener("DOMContentLoaded", () => {
  inputValue = document.getElementById("input");
  container = document.getElementById("container");

  const todos = getItem();
  todos.forEach((todo) => {
    const cardDiv = buildTodoCard(todo);
    container.appendChild(cardDiv);
  });
});
