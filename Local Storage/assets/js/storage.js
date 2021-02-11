function addToDatabase(newTask) {
    let listofTasks;
    if(localStorage.getItem("tasks") == null) {
        listofTasks = [];
    } else {
        listofTasks = JSON.parse(localStorage.getItem("tasks"));
    }
    listofTasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(listofTasks));
}

function loadfromDB() {
    let listOfTasks;
    if(localStorage.getItem('tasks') == null) {
        listOfTasks = [];
    } else {
        listOfTasks = JSON.parse(localStorage.getItem('tasks'));
    }
    return listOfTasks;
}