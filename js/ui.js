import { saveItem, getItem, deleteItem, toggleComplete } from "./storage.js";

let inputValue;
let container;
let popupOverlay;
let dueDateInput;
let levelSelect;
let popupConfirm;
let popupCancel;

//function to build a todo card with a header, delete button, and date
function buildTodoCard(todo) {
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card");
  if (todo && typeof todo === 'object' && todo.id) {
    cardDiv.dataset.id = todo.id;
  }

  const taskText = typeof todo === "string" ? todo : todo.task;
  const dueDate = todo && typeof todo === "object" ? todo.dueDate : null;
  const level = todo && typeof todo === "object" ? todo.level : null;
  const completed = todo && typeof todo === 'object' ? !!todo.completed : false;

  if (completed) {
    cardDiv.classList.add('completed');
  }

  if (level) {
    cardDiv.classList.add(level);
  }

  if (dueDate || level) {
    const infoRow = document.createElement("div");
    infoRow.classList.add("card-info");

    if (dueDate) {
      const dueText = document.createElement("span");
      const today = new Date();
      const parsedDate = new Date(dueDate);
      const diffTime = parsedDate - today;
      const diffDays = Math.ceil(diffTime/(1000 * 60 * 60 * 24))
      
      let dueTexted = ''
      if(diffDays > 0){
        dueTexted = `Due in ${diffDays} day(s)`
      }else if(diffDays === 0){
        dueTexted= "Due today";
      }else{
        dueTexted =`Overdue by ${Math.abs(diffDays)} day(s)`
      }
      dueText.textContent = dueTexted;
      infoRow.appendChild(dueText);
    }

    if (level) {
      const levelText = document.createElement("span");
      const ball = document.createElement("span");
      ball.style.display = "inline-block"
      ball.style.width="10px";
      ball.style.height="10px";
      ball.style.borderRadius="50%";
      if(level === "easy"){
        ball.style.backgroundColor="green";
      }else if(level === "medium"){
        ball.style.backgroundColor="orange";
      }else{
        ball.style.backgroundColor="red";

    }
      levelText.appendChild(ball)
      levelText.append(level.charAt(0).toUpperCase() + level.slice(1));
      levelText.style.display ="flex";
      levelText.style.alignItems="center";
      levelText.style.gap="12px";
      infoRow.appendChild(levelText);
    }

    cardDiv.appendChild(infoRow);
  }

  // add a div element to hold the header, complete toggle and delete button
  const Cardholder = document.createElement("div");
  Cardholder.classList.add("div-holder");

  const completeToggle = document.createElement('button');
  completeToggle.classList.add('complete-toggle');
  completeToggle.setAttribute('aria-label', 'toggle complete');
  completeToggle.innerHTML = completed ? '&#10003;' : '';
  Cardholder.appendChild(completeToggle);

  const header = document.createElement("p");
  header.textContent = taskText;
  Cardholder.appendChild(header);
  cardDiv.appendChild(Cardholder);

  completeToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const id = todo && todo.id;
    if (id) {
      toggleComplete(id);
      cardDiv.classList.toggle('completed');
      completeToggle.innerHTML = cardDiv.classList.contains('completed') ? '&#10003;' : '';
    }
  });

  const footer = document.createElement("div");
  footer.classList.add("footer");
  const deleteIcon = document.createElement("span");
  deleteIcon.classList.add("delete-icon");
  deleteIcon.innerHTML = `<i class='fas fa-trash'></i>`;
  footer.appendChild(deleteIcon);

  deleteIcon.addEventListener("click", () => {
    if (todo && typeof todo === "object" && todo.id) {
      deleteItem(todo.id);
    } else {
      deleteItem(taskText);
    }
    cardDiv.remove();
    updateEmptyState();
  });

  // add div element to hold the date
  const date = document.createElement("small");
  const currentDate = new Date();
  date.textContent = `created: ${currentDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
  footer.appendChild(date);
  cardDiv.appendChild(footer);

  return cardDiv;
}

// function to show an error message when the input is empty
function showInputMessage() {
  const errorMessage =
    document.getElementById("error-message") || document.createElement("div");
  errorMessage.id = "error-message";
  errorMessage.classList.add("error-message");
  errorMessage.textContent = "Please add a task ";
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

function removeErrorMessage() {
  const existing = document.getElementById("error-message");
  if (existing) {
    existing.remove();
  }
}

// function to remove the empty state message when a new card is added
export function removeEmptyState() {
  const existing = document.getElementById("empty-state");
  if (existing) existing.remove();
}

//show empty state
export function showEmptyState() {
  if (!container) return;
  if (document.getElementById("empty-state")) return;

  const emptyState = document.createElement("div");
  emptyState.id = "empty-state";
  emptyState.classList.add("emptyState");

  const emptyMessage = document.createElement("p");
  emptyMessage.textContent = "No tasks added yet";
  emptyState.appendChild(emptyMessage);

  const iconEmpty = document.createElement("span");
  iconEmpty.classList.add("empty-icon");
  iconEmpty.innerHTML = `<i class='fas fa-tasks'></i>`;
  emptyState.appendChild(iconEmpty);
  container.appendChild(emptyState);
}

// function to check if there are any cards left, if not show the empty state
function updateEmptyState() {
  if (!container) return;
  const hasCard = container.querySelector(".card");
  if (!hasCard) {
    showEmptyState();
  }
}

export function showTaskPopup() {
  
  if (!popupOverlay) return;
  
  // Clear error message
  const errorDiv = document.getElementById("popup-error-message");
  if (errorDiv) {
    errorDiv.style.display = "none";
  }
  
  // Remove error styling
  if (inputValue) inputValue.classList.remove("error-input");
  if (dueDateInput) dueDateInput.classList.remove("error-input");
  if (levelSelect) levelSelect.classList.remove("error-input");
  
  popupOverlay.classList.remove("hidden");
  if (inputValue) inputValue.value = "";
  if (dueDateInput) dueDateInput.value = "";
  if (levelSelect) levelSelect.value = "easy";
  if (inputValue) inputValue.focus();
}

export function filterTodos(mode) {
  if (!container) return;
  const cards = Array.from(container.querySelectorAll('.card'));
  cards.forEach(card => {
    const isCompleted = card.classList.contains('completed');
    if (mode === 'all') {
      card.style.display = '';
    } else if (mode === 'active') {
      card.style.display = isCompleted ? 'none' : '';
    } else if (mode === 'completed') {
      card.style.display = isCompleted ? '' : 'none';
    }
  });
}

// Filter cards by text in title, respecting current active filter button
export function filterByText(query) {
  if (!container) return;
  const q = (query || '').trim().toLowerCase();
  const activeBtn = document.querySelector('.filter-btn.active');
  let mode = 'all';
  if (activeBtn) {
    if (activeBtn.id === 'active-card') mode = 'active';
    else if (activeBtn.id === 'completed-card') mode = 'completed';
  }

  const cards = Array.from(container.querySelectorAll('.card'));
  cards.forEach(card => {
    const titleEl = card.querySelector('p');
    const title = titleEl ? titleEl.textContent.toLowerCase() : '';
    const matchesText = q === '' || title.includes(q);
    const isCompleted = card.classList.contains('completed');

    let passesFilter = true;
    if (mode === 'active') passesFilter = !isCompleted;
    else if (mode === 'completed') passesFilter = isCompleted;

    card.style.display = (matchesText && passesFilter) ? '' : 'none';
  });
}


function hideTaskPopup() {
  if (!popupOverlay) return;
  popupOverlay.classList.add("hidden");
}

function showPopupError(message) {
  let errorDiv = document.getElementById("popup-error-message");
  if (!errorDiv) {
    errorDiv = document.createElement("div");
    errorDiv.id = "popup-error-message";
    errorDiv.classList.add("popup-error-message");
    const popupCard = document.querySelector(".popup-card");
    if (popupCard) {
      popupCard.insertBefore(errorDiv, popupCard.firstChild);
    }
  }
  errorDiv.textContent = message || "Please fix the errors";
  errorDiv.style.display = "block";

  // Add red focus to inputs
  if (inputValue) inputValue.classList.add("error-input");
  if (dueDateInput) dueDateInput.classList.add("error-input");
  if (levelSelect) levelSelect.classList.add("error-input");

  // Remove error after 3 seconds
  setTimeout(() => {
    errorDiv.style.display = "none";
    if (inputValue) inputValue.classList.remove("error-input");
    if (dueDateInput) dueDateInput.classList.remove("error-input");
    if (levelSelect) levelSelect.classList.remove("error-input");
  }, 3000);
}

function submitTask() {
  if (!popupOverlay) return;
  const taskValue = inputValue ? inputValue.value.trim() : "";

  if (!taskValue) {
    showPopupError();
    return;
  }

  const dueDate = dueDateInput ? dueDateInput.value : "";
  const level = levelSelect ? levelSelect.value : "easy";
  const success = createTaskFromPopup(taskValue, dueDate, level);
  if (success) {
    hideTaskPopup();
  }
}

function createTaskFromPopup(taskValue, dueDate, level) {
  if (!container) {
    console.error("Container not found");
    return false;
  }

  removeEmptyState();

  const todo = {
    id: Date.now(),
    task: taskValue,
    dueDate,
    level,
    completed: false,
  };

  const cardDiv = buildTodoCard(todo);
  container.appendChild(cardDiv);
  saveItem(todo);
  inputValue.value = "";
  return true;
}

// function create call others functions to create a todo card, save it to local storage, and clear the input field
// Used for the main input outside the popup
export function createElement(dueDate = "", level = "easy") {
  if (!inputValue || !container) {
    console.error("Input or container not found");
    return false;
  }

  const value = inputValue.value.trim();
  if (!value) {
    showInputMessage();
    return false;
  }

  removeErrorMessage();
  removeEmptyState();

    const todo = {
      id: Date.now(),
      task: value,
      dueDate,
      level,
      completed: false,
    };

  const cardDiv = buildTodoCard(todo);
  container.appendChild(cardDiv);
  saveItem(todo);
  inputValue.value = "";
  return true;
}

// Load and display todos on page load
window.addEventListener("DOMContentLoaded", () => {
  inputValue = document.getElementById("input");
  container = document.getElementById("container");
  popupOverlay = document.getElementById("task-popup");
  dueDateInput = document.getElementById("due-date-input");
  levelSelect = document.getElementById("level-select");
  popupConfirm = document.getElementById("confirm-task");
  popupCancel = document.getElementById("cancel-popup");

  if (popupConfirm) {
    popupConfirm.addEventListener("click", submitTask);
  }
  if (popupCancel) {
    popupCancel.addEventListener("click", hideTaskPopup);
  }
  if (popupOverlay) {
    popupOverlay.addEventListener("click", (event) => {
      if (event.target === popupOverlay) {
        hideTaskPopup();
      }
    });
  }

  const todos = getItem();
  if (!todos || todos.length === 0) {
    showEmptyState();
  } else {
    todos.forEach((todo) => {
      const cardDiv = buildTodoCard(todo);
      container.appendChild(cardDiv);
    });
  }
});
