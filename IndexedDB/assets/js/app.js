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

    function displayTaskList() {
        while(taskList.firstChild) { 
            taskList.removeChild(taskList.firstChild); 
        }

        let objectStore = DB.transaction("tasks").objectStore("tasks");

        objectStore.openCursor().onsuccess = function(e) {
            let cursor = e.target.result;
            
            if (cursor) {
                const li = document.createElement('li');
                li.className = 'collection_item';          

                const link = document.createElement('a');
                link.className = 'delete-item secondary-content';
                link.innerHTML = '<i class="fa fa-remove"></i>';    
                link.innerHTML = `
                <i class="fa fa-remove"></i>  &nbsp;
                <a href=".//edit.html?id=${cursor.value.id}"><i class="fa fa-edit"></i> </a> `;              
                

                if (isAscending) {
                    taskList.appendChild(li);  
                    li.appendChild(link); 
                }
                else {        
                    taskList.insertBefore(li, taskList.children[0]);
                    li.appendChild(link);                 
                }                
                
                // Create text node and append it
                li.setAttribute('data-task-id', cursor.value.id);
                li.appendChild(document.createTextNode(cursor.value.taskname));                   

                cursor.continue();
            }
        }
    }



});