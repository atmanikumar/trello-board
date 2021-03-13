function toggleListForm(){
    const listForm = document.querySelector('.add-list-form');
    if(listForm.className.includes('show')){
        listForm.classList.remove('show')
    }else{
        listForm.classList.add('show');
    }
}


function toggleTaskForm(list, item){
    const listForm = document.querySelector('.add-task-form');
    listForm.classList.add('show');
    listForm.dataset.list = list;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev, source, taskId) {
    ev.dataTransfer.setData("source", source);
    ev.dataTransfer.setData("taskId", taskId);
}