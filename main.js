const addButton = document.getElementById('addButton');
const fieldName = document.getElementById('name');
const taskBox = document.querySelector('.content__task');

const task = []
let action = 'create'
let elementSelected = ''

const getElementToStorage = () => {
    const elements = localStorage.getItem('task')
    return JSON.parse(elements)
}
const saveElementToStorage = (taskList) =>  localStorage.task = JSON.stringify(taskList); 

const initCheckTask = () => {
    const taskList = getElementToStorage()
    if(taskList){
        taskList.forEach(element => {
            task.push(element)
            displayTask(element)
        });
    }
}

const taskChange = (event) => {
    event.stopPropagation()
    const parent = event.target.parentNode;
    const text = parent.firstChild;
    text.style.textDecorationLine = 'line-through'
} 

const eliminateTask = (event) => {
    event.stopPropagation()
    event.target.parentNode.style.display = 'none'
    const id = event.target.parentNode.id
    const elementsLocalStorage = getElementToStorage();
    const newElements = elementsLocalStorage.filter(element => element.id !== id);
    saveElementToStorage(newElements)
    task.splice(elementsLocalStorage.findIndex(element => element.id === id), 1)
}

const editTask = (event) => {
    event.stopPropagation()
    const parent = event.target.parentNode;
    parent.style.display = 'none'
    const text = parent.firstChild;
    fieldName.value = text.textContent
    action = "edit"
    elementSelected = parent.id
}

const displayTask = (task) => {

    let container = document.createElement('div');
    let text = document.createElement('p');
    text.innerHTML = task.name;
    container.id = task.id;
    container.className = 'content__container';
    container.addEventListener('click', taskChange, false);
    container.appendChild(text);

    let buttonEdit = document.createElement('button');
    buttonEdit.type = 'button';
    //buttonEdit.innerText = 'edit';
    buttonEdit.value = 'change';
    buttonEdit.className = 'content__buttons fa-solid fa-pencil';
    buttonEdit.style.backgroundColor = '#bde998';
    buttonEdit.style.border = 'none'
    buttonEdit.style.margin = (0, 0, 0, 120);
    buttonEdit.addEventListener('click', editTask, false);
    
    
    let buttonTrash = document.createElement('button');
    buttonTrash.className = 'content__buttons fa-solid fa-trash';
    buttonTrash.type = 'button';
    //buttonTrash.innerText = 'eliminate';
    buttonTrash.style.backgroundColor = '#953bfb';
    buttonTrash.style.border = 'none'
    buttonTrash.value = 'trash';
    buttonTrash.addEventListener('click', eliminateTask, false);

    container.appendChild(buttonEdit);
    container.appendChild(buttonTrash);

    taskBox.appendChild(container);
    fieldName.value = "";
}

const createTask = () => {
    let taskID = "";

    if(action === "edit"){
        const taskList = getElementToStorage();
        const newList = taskList.map(element => {
            if (element.id === elementSelected) {
                element.name = fieldName.value
            }
            return element
        });
        taskID = elementSelected;
        saveElementToStorage(newList)
        task.forEach(element => {
            if (element.id === elementSelected) {
                element.name = fieldName.value
            }
        });
    } else {
        taskID = Math.floor(Math.random() * 101).toString()
        task.push({
            id: taskID,
            name: fieldName.value
        })
        saveElementToStorage(task)
    }

    action = "create"
    displayTask({
        id: taskID,
        name: fieldName.value
    })
    
}

addButton.addEventListener('click', createTask);
initCheckTask();
