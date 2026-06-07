import { showTaskPopup, filterTodos, filterByText } from "./ui.js"
const addButton = document.getElementById("add-button")

try {
  if (addButton) {
    addButton.addEventListener("click", () => {
      showTaskPopup()
    })
  }
} catch (error) {
  console.error("Error adding event listener to addButton:", error)
}

// Filter buttons: toggle .active and keep only one active
const filterButtons = document.querySelectorAll('.filter-btn');
if (filterButtons && filterButtons.length) {
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const id = btn.id;
      if (id === 'all-card') filterTodos('all');
      if (id === 'active-card') filterTodos('active');
      if (id === 'completed-card') filterTodos('completed');
    });
  });
}

// Search input: filter by title as user types and on Enter
const searchInput = document.querySelector('.search-input');
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    filterByText(e.target.value);
  });
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      filterByText(e.target.value);
    }
  });
}
