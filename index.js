import tasks from './task.js';
import task from './task.js';

document.querySelector('.add-list-form').addEventListener('submit', (event) => {
    event.preventDefault()
    const value = event.target.elements['list-name'].value;
    if (value) {
        tasks.addList(value)
        document.querySelector('.add-list-form').classList.remove('show');
        event.target.reset();
    }
});


document.querySelector('.add-task-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const target = event.target;
    const title = target.elements['title'].value;

    const description = target.elements['description'].value;

    if (title && description) {
        tasks.addListItem(target.dataset.list, title, description)
        document.querySelector('.add-task-form').classList.remove('show');
        target.reset();
    }
});

document.addEventListener("dragover", function(event) {
    event.preventDefault();
  });


document.querySelector('.task-container').addEventListener('drop', (event) => {
    const source = event.dataTransfer.getData("source");
    const taskId = event.dataTransfer.getData("taskId");
    const target = event.target;
    if(target.className.includes('box')){
        tasks.completeDrop(source, taskId, target)
    }
})

const onPageLoad = () => {
    task.renderTasks();
}



window.onload = onPageLoad;