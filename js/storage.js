export function getItem(){
    const todo= JSON.parse(localStorage.getItem("item")) || []
     return todo
}
export function saveItem(value){
    const todos = getItem()
    todos.push(value)
    localStorage.setItem("item", JSON.stringify(todos))
}
export function deleteItem(value){
    const todos = getItem();
    const index = todos.indexOf(value);
    if (index !== -1) {
        todos.splice(index, 1);
        localStorage.setItem("item", JSON.stringify(todos));
    }
}