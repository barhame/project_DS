function ajouter(){
    const tache = document.getElementById('task');
    if(tache.value){
        const tasklist = document.getElementById('taskList');
        const newItem = document.createElement('li');
        const tacheTerminer = document.getElementById('taskListTerminer');
        const newItems = document.createElement('li');
        newItem.innerText = tache.value;
        //const taskTermine = document.getElementById('taskListTerminer');
        //tache encours
        $(newItem).on('swipeleft', function(){
            newItem.classList.add('complet');
            newItem.classList.remove('encurs');
            newItem.style.color = 'green';
            tacheTerminer.appendChild(newItem);
            $(tacheTerminer).listview('refresh');
        })

        $(newItem).on('swiperight', function(){
           newItem.classList.add('encours');
           newItem.classList.remove('complet');
           newItem.style.color = 'black';
           tasklist.appendChild(newItem);
           $(tasklist).listview('refresh');
        })
        tasklist.appendChild(newItem);
        $(tasklist).listview('refresh');
        task.select();
    }
}

function reinitialiser(){
    const taskList = document.getElementById('taskList');
    const task = document.getElementById('task');
    const tacheTerminer = document.getElementById('taskListTerminer');

    taskList.innerHTML = '';
    tacheTerminer.innerHTML = '';
    task.value = '';
    task.focus();
}