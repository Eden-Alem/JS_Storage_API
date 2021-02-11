
const taskInput = document.querySelector('#task');
const form = document.querySelector('#task-form');
const filter = document.querySelector('#filter'); 
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const desc = document.querySelector('#drop');
let isAscending = true;


form.addEventListener('submit', addNewTask);
clearBtn.addEventListener('click', clearAllTasks);
desc.addEventListener('change', reverseOrder);
filter.addEventListener('keyup', filterTasks);
taskList.addEventListener('click', removeTask);

function addNewTask(e) {
    e.preventDefault(); 
    const li = document.createElement('li');
    li.className = 'collection_item';
    li.appendChild(document.createTextNode(taskInput.value)); 
    addToDatabase(taskInput.value);   

    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';    
    
    if (isAscending) {
        taskList.appendChild(li);  
        li.appendChild(link);      
    }
    else {        
        taskList.prepend(li, taskList.children[0]);
        li.appendChild(link);
    }

    if (taskInput.value === "") {
        taskInput.style.borderColor = "red";
        return;
    }
    
}

function clearAllTasks() {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    clearAllTasksfromDB();
}

function filterTasks(e) {
    let collections = document.querySelectorAll('.collection_item');
    collections.forEach(element => {
        element.style.display = (element.textContent.toUpperCase().indexOf(filter.value.toUpperCase()) > -1) ? 'block' : 'none';
    });
}

function reverseOrder(e) {
    const collectionsList = document.querySelectorAll('.collection_item');
    const order = new Array();
    for (let index = 0; index < collectionsList.length; index++) {
        order.push(collectionsList[index]);         
    }
    order.reverse();

    for (let index = 0; index < collectionsList.length; index++) { 
        taskList.appendChild(order[index]); 
    }    
    
    isAscending = !isAscending;
}

taskList.addEventListener('click', removeTask);

function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure you want to remove this task?')) {
            e.target.parentElement.parentElement.remove();
            removefromDB(e.target.parentElement.parentElement);
        }
    }
    
}

const reloader = document.querySelector(".fa");
reloader.addEventListener('click', () => location.reload() )

// document.querySelector('#signup').addEventListener('click', function() {
// alert('Sign up button click');
// });

// document.querySelector('#account_links').addEventListener('click', function()  {
// alert('Account links click');
// });

// document.querySelector('#header').addEventListener('click',function () {
// alert('Header click');
// });


  

