export function getItem(){
    const todo= JSON.parse(localStorage.getItem("item")) || []
     return todo
}
export function saveItem(value){
    const todos = getItem()
    todos.push(value)
    localStorage.setItem("item", JSON.stringify(todos))
}
export function deleteItem(value) {
    const todos = getItem();
    const filteredTodos = todos.filter((item) => {
        if (typeof value === "number") {
            return !(item && typeof item === "object" && item.id === value);
        }

        if (typeof value === "string") {
            if (item && typeof item === "object") {
                return item.task !== value;
            }
            return item !== value;
        }

        return true;
    });
    localStorage.setItem("item", JSON.stringify(filteredTodos));
}
