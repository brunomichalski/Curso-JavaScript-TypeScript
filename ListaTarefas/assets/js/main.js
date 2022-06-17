const novaTarefa = document.querySelector('.nova-tarefa');
const addTarefa = document.querySelector('.btn-add-tarefa');
const tarefas = document.querySelector('.tarefas');


function criaTarefa(texto) {
    //Cria LI
    const li = document.createElement('li');
    li.innerText = texto;
    li.innerText += " ";
    
    //Cria Botão
    const botaoApagar = document.createElement('button')
    botaoApagar.innerText = 'Apagar';
    botaoApagar.setAttribute('class', 'apagar');
    botaoApagar.setAttribute('title', 'apagar está tarefa');
    li.appendChild(botaoApagar);

    tarefas.appendChild(li);
    novaTarefa.value = "";
    novaTarefa.focus();

    salvaTarefas();
}

function salvaTarefas() {
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];

    for (let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
        listaDeTarefas.push(tarefaTexto);
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON);
}

function recuperaTarefa() {
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas)
    //console.log(listaDeTarefas)
    for (const tarefa of listaDeTarefas) {
        criaTarefa(tarefa);
    }
}

novaTarefa.addEventListener('keypress', function (e) {
    if (e.key == 'Enter') {
        if (!novaTarefa.value) return;
        criaTarefa(novaTarefa.value);
    }
})

addTarefa.addEventListener('click', function () {
    if (!novaTarefa.value) return;
    criaTarefa(novaTarefa.value);
})

document.addEventListener('click', function(e) {
    const el = e.target;

    if (el.classList.contains('apagar')) {
        el.parentElement.remove();
        salvaTarefas();
    }
})




recuperaTarefa()