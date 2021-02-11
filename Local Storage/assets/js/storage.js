document.addEventListener('DOMContentLoaded', loadTasksfromDB);

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

function loadTasksfromDB() {
    let taskLists = loadfromDB();
    if (taskLists.length != 0) {
        taskLists.forEach((eachTask) => {
            const li = document.createElement('li');
            li.className = 'collection-item';
            li.appendChild(document.createElement('a'));
            const link = document.createElement('a');
            link.className = 'delete-item secondary-content';
            link.innerHTML = '<i class="fa fa-remove"></i>';
            li.appendChild(link);
            taskLists.appendChild(li);
        });
    }
}

function clearAllTasksfromDB () {  localStorage.clear();}

function removefromDB(taskItem) {
    // console.log(taskItem.textContent);
    let listofTasks;
    if (localStorage.getItem('tasks') == null) {
        listofTasks = [];
    } else {
        listofTasks = JSON.parse(localStorage.getItem('tasks'));
    }
    listofTasks.forEach(function(task, index) {
        if (taskItem.textContent.trim() === task.trim())
        listofTasks.splice(index, 1);
    });
    localStorage.setItem('tasks', JSON.stringify(listofTasks));
}
   
