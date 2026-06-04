import { createElement, removeEmptyState } from "./ui.js"

const addButton = document.getElementById("add-button")

try {
if(addButton) {
  addButton.addEventListener("click", () => {
    createElement()
  })
}
} catch (error) {
  console.error("Error adding event listener to addButton:", error)
}
