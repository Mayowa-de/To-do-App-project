import { createElement } from "./ui.js"

const addButton = document.getElementById("add-button")

console.log("addButton:", addButton)
console.log("createElement function:", createElement)

if(addButton) {
  addButton.addEventListener("click", () => {
    console.log("Button clicked!")
    createElement()
  })
}