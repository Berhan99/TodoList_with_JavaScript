const todo = document.getElementById("add-input");
const todoform = document.querySelector("#todo-form");
const cardBody1 = document.querySelectorAll(".card-body")[0];
const cardBody2 = document.querySelectorAll(".card-body")[1];
const todoList = document.querySelector(".list-group");
const alertPlace = document.querySelector(".alert-place");
const removeAllButton = document.getElementById("remove-all-but");
const filterInput = document.getElementById("filter-input");




eventlisteners();

function eventlisteners(){

    todoform.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadDatas);
    cardBody2.addEventListener("click",deleteTodo);
    removeAllButton.addEventListener("click",removeAllTodos);
    filterInput.addEventListener("keyup",filterTodos);
    
    

}

function addTodo(e){
    const newTodo = todo.value.trim();

    if(newTodo === ""){

        showAlert("danger","Please add a Todo",cardBody1);
    }
    else{
        addTodoToUI(newTodo);
        addTodoToLocalStorage(newTodo);
        showAlert("success","Todo added successfully!",alertPlace);
        todo.value="";
    }

    

    e.preventDefault();
}

function addTodoToUI(newTodo){

    const listItem = document.createElement("li");
    listItem.className = "list-group-item d-flex justify-content-between";
    const link = document.createElement("a");
    link.className="delete-item";
    link.href = "#";
    link.innerHTML = "<i class='fa fa-remove'></i>";
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);
    todoList.appendChild(listItem);

}

function showAlert(type,message,place){
    const alert = document.createElement("div");
    const placeToAdd = place;
    
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    
    //cardBody1.appendChild(alert);
    placeToAdd.appendChild(alert);
    

    setTimeout(function(){ alert.remove(); } , 1500);

}

function getItemFromLocalStorage(){
    let todos = localStorage.getItem("todos");
    
    if(todos === null){
        todos = [];
    }
    else{
        todos = JSON.parse(todos);
    }
    
    return todos;

}

function addTodoToLocalStorage(newTodo){

    todos = getItemFromLocalStorage();

    todos.push(newTodo);

    localStorage.setItem("todos", JSON.stringify(todos));
}

function loadDatas(){
    let todos = getItemFromLocalStorage();

    todos.forEach(function(todo){
        addTodoToUI(todo);
        
    });

}

function deleteTodo(e){
    
    if(e.target.className === "fa fa-remove"){
        let target = e.target.parentElement.parentElement;
        target.remove();
        deleteTodoFromStorage(target.textContent);
        showAlert("success","Todo deleted successfully!",alertPlace)
    }
}

function deleteTodoFromStorage(deletetodo){

    let todos = getItemFromLocalStorage();

    todos.forEach(function(todo,index){
        if(todo === deletetodo){
            todos.splice(index,1);
        }
    })

    localStorage.setItem("todos", JSON.stringify(todos));
}

function removeAllTodos(e){

    let todos = getItemFromLocalStorage();


    localStorage.setItem("todos", JSON.stringify(todos));


}

function filterTodos(e){
    //const filtertodo = e.target.value.toLowerCase();
    const filtertodo = filterInput.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");
    

    listItems.forEach(function(item){
        const text = item.textContent.toLowerCase();

        if(text.indexOf(filtertodo) === -1){
            item.setAttribute("style","display: none !important");

        }
        else{
            item.setAttribute("style","display: block");
        }
    });
        


}

function removeAllTodos(e){
    if(confirm("Are you sure to remove all todos ?")){

        while(todoList.firstElementChild != null){
            todoList.removeChild(todoList.firstElementChild);
        }
        showAlert("success","All todos got deleted successfully!",alertPlace);
    
        localStorage.removeItem("todos");
    }
   
    
    
}







