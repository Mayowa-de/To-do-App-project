import { saveItem, getItem, deleteItem } from "./storage.js";

let inputValue;
let container;

function buildTodoCard(todo) {
  try {
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
  } catch (error) {
    console.error("Error building todo card:", error);
    const errorMessage = document.createElement("div");
    errorMessage.classList.add("error-message");
    const Message = document.createElement("p");
    const icon = document.createElement("span");
    icon.classList.add("error-icon");
    Message.textContent = "Empty items";
    errorMessage.appendChild(Message);
    icon.innerHTML = `<i class='fas fa-trash'></i>`;
    errorMessage.appendChild(icon);
    return errorMessage;
  }
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
