
const initialState = [
    {
        name: "Todo",
        items: [
            {
                title: "Static page",
                description: "Create Static Page",
            },
            {
                title: "Assets page",
                description: "Update Static Page",
            },
            {
                title: "Integrate API",
                description: "Integrate API and Form validation",
            },
        ]
    }
]

class Tasks {

    constructor() {
        const tasks = localStorage.getItem('tasks');
        this.tasks = tasks ? JSON.parse(tasks) : initialState;
        this.taskContainer = document.querySelector('.task-container');

        this.addCloseIconListener();
    }

    addCloseIconListener() {
        this.taskContainer.addEventListener('click', (event) => {
            const target = event.target;
            if (target.tagName === 'SPAN') {
                this.removeList(target.dataset.id, target.parentNode.parentNode)
            }
            if (target.tagName === 'I') {
                this.removeTaskItems(target.dataset.id, target.dataset.task, target.parentNode)
            }
        })
    }

    renderList(name, items) {
        return (
            `<div class='list-header'>
                        ${name}
                            <span data-id='${name}' class="material-icons close-icon close-list-icon">
                                close
                            </span>
            </div>
            <div id="list-${name}" class="list">
                ${items}
                <div class='add-task-btn'>
                    <button onclick='toggleTaskForm("${name}")'>Add</button>
                </div>
            </div>`
        )
    }

    saveData() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    addList(taskName) {

        const index = this.tasks.findIndex(item => item.name === taskName);

        if (index !== -1) {
            return;
        }

        this.tasks.push({
            name: taskName,
            items: []
        });

        const taskItem = document.createElement('div');

        taskItem.classList.add('todo');
        taskItem.classList.add('box');
        taskItem.setAttribute('id', taskName);
        taskItem.innerHTML = this.renderList(taskName, '')

        this.taskContainer.appendChild(taskItem);

        this.saveData()
    }

    addListItem(listName, title, description){
        const index = this.tasks.findIndex(item => item.name === listName);

        if (index === -1) {
            return;
        }

        this.tasks[index].items.push({
            title,
            description,
        });

        const taskItem = document.createElement('div');

        const selector = `#list-${listName}`;

        taskItem.classList.add('drag-item');

        taskItem.setAttribute('ondragstart', `drag(event, "${listName}", "${title}")`)
        taskItem.setAttribute('id', title)
        taskItem.setAttribute('draggable', 'true')

        taskItem.innerHTML = 
        ` <h4>${title}</h4>
          <p>${description}</p>
          <i data-id='${listName}' data-task='${title}' class="material-icons close-icon">close</i>`

        this.taskContainer.querySelector(selector).appendChild(taskItem)

        this.saveData()
    }

    removeList(listName, element) {
        const index = this.tasks.findIndex((item) => item.name === listName);

        this.tasks.splice(index, 1)

        this.taskContainer.removeChild(element)

        this.saveData()

    }

    removeTaskItems(listName, itemName, element) {
        const listIndex = this.tasks.findIndex((item) => item.name === listName);
        const itemIndex = this.tasks[listIndex].items.findIndex((item) => item.title === itemName)

        element.parentNode.removeChild(element);

        this.tasks[listIndex].items.splice(itemIndex, 1);

        this.saveData();
    }

    completeDrop(source, taskId,  destTarget){
        
        const task = document.getElementById(taskId);
        const sourceElem = document.getElementById(source).querySelector(`#list-${source}`);
        sourceElem.removeChild(task);
        const id = destTarget.id;
        task.setAttribute('ondragstart', `drag(event, '${id}', '${taskId}')`);
        destTarget.querySelector(`#list-${id}`).prepend(task)

        const srcIndex = this.tasks.findIndex((item) => item.name === source)
        const taskIndex = this.tasks[srcIndex].items.findIndex((item) => item.title === taskId)
        const dragElem = this.tasks[srcIndex].items[taskIndex];
        this.tasks[srcIndex].items.splice(taskIndex, 1);
        const destIndex = this.tasks.findIndex((item) => item.name === id);
        this.tasks[destIndex].items.unshift(dragElem)

        this.saveData()
    }

    renderTaskItem(taskName, item) {
        return (
            `<div id='${item.title}' class='drag-item' ondragstart="drag(event, '${taskName}', '${item.title}')" draggable="true">
                <h4>${item.title}</h4>
                <p>${item.description}</p>
                <i data-id='${taskName}' data-task='${item.title}' class="material-icons close-icon">
                        close</i>
            </div>`
        )
    }

    renderTasks() {
        let taskDetails = '';

        for (const task of this.tasks) {

            let taskItems = '';

            for (const taskItem of task.items) {
                taskItems += this.renderTaskItem(task.name, taskItem)
            }

            taskDetails += `<div class="todo box" id="${task.name}">
                    ${this.renderList(task.name, taskItems)}
                </div>`
        }

        this.taskContainer.innerHTML = taskDetails;
    }

}

export default new Tasks();