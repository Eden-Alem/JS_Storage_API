const taskInput = document.querySelector('#task'); //the task input text field
const form = document.querySelector('#task-form'); //The form at the top
const filter = document.querySelector('#filter'); //the task filter text field
const taskList = document.querySelector('.collection'); //The UL
const clearBtn = document.querySelector('.clear-tasks'); //the all task clear button
const reloadIcon = document.querySelector('.fa');
const desc = document.querySelector('#drop');

let isAscending = true;

let DB;

document.addEventListener('DOMContentLoaded', () => {
    let TasksDB = indexedDB.open('tasks', 2);
    TasksDB.onsuccess = function() {
        console.log(`Database is ready`);
        DB = TasksDB.result;

        console.log(DB);
        displayTaskList();
        
    }

    TasksDB.onerror = function() {
        console.log(`An error occured`);
    }

    //on upgrade or after version is changed
    TasksDB.onupgradeneeded = function(e) {
        console.log(`On upgrade`);
        let db = e.target.result;

        let objectStore = db.createObjectStore('tasks', {keyPath:'id', autoIncrement: true});

        objectStore.createIndex('taskname', 'taskname', {unique: false});
        console.log(`Its ready`);

    }

    form.addEventListener('submit', addNewTask);

    function addNewTask(e) {
        e.preventDefault(); 

        if (taskInput.value === "") {
            taskInput.style.borderColor = "red";
            return;
        }
        // create a new object with the form info
        let newTask = {
            taskname: taskInput.value
        }
        // Insert the object into the database
        let transaction = DB.transaction(['tasks'], 'readwrite');
        let objectStore = transaction.objectStore('tasks');
        let request = objectStore.add(newTask);
        // on success
        request.onsuccess = () => {
            form.reset();
        }
        transaction.oncomplete = () => {
            console.log('New Task added');
            displayTaskList();
        }
        transaction.onerror = () => { console.log('There was an error, try again!'); }
    }


});