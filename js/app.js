import { showTaskPopup } from "./ui.js"
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
