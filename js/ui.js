import { saveItem, getItem, deleteItem } from "./storage.js";

let inputValue;
let container;

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

  const deleteIcon = document.createElement("button");
  deleteIcon.classList.add("delete-icon");
  deleteIcon.textContent = "Delete";
  Divholder.appendChild(deleteIcon); 

  deleteIcon.addEventListener("click", () => {
    deleteItem(todo);
    cardDiv.remove();
  });
  // add div element to hold the date
  const footer = document.createElement("div");
  const date = document.createElement("p");
  const currentDate = new Date();
  date.textContent = currentDate.toLocaleTimeString();
  footer.appendChild(date);
  cardDiv.appendChild(footer);

  return cardDiv;
}

export function createElement() {
  if (!inputValue || !container) {
    console.error("Elements not loaded yet");
    return;
  }

  const value = inputValue.value.trim();
  if (!value) {
    console.warn("Input is empty");
    return;
  }

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

