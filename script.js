// Espera o conteúdo da página carregar
document.addEventListener("DOMContentLoaded", function () {
    // Verifica em qual página estamos
    if (window.location.pathname.includes("pagina3.html")) {
        setupCriarTarefa();
    } else if (window.location.pathname.includes("pagina4.html")) {
        exibirTarefas();
    }
});

// Função para criar tarefa
function setupCriarTarefa() {
    const btnCriar = document.querySelector("button[onclick='btnCria']");
    const inputTitulo = document.getElementById("tituloTarefa");
    const inputDescricao = document.getElementById("descricao");

    btnCriar.addEventListener("click", function () {
        const titulo = inputTitulo.value.trim();
        const descricao = inputDescricao.value.trim();

        if (!titulo || !descricao) {
            alert("Preencha todos os campos!");
            return;
        }

        // Pega tarefas salvas (ou cria array novo)
        let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

        // Adiciona nova tarefa
        tarefas.push({ titulo, descricao });

        // Salva no localStorage
        localStorage.setItem("tarefas", JSON.stringify(tarefas));

        // Limpa campos e avisa
        inputTitulo.value = "";
        inputDescricao.value = "";
        alert("Tarefa criada com sucesso!");
    });
}

// Função para exibir tarefas na página 4
function exibirTarefas() {
    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    const container = document.querySelector(".container .row");

    container.innerHTML = ""; // Limpa os cards fixos do HTML

    tarefas.forEach((tarefa, index) => {
        const card = document.createElement("div");
        card.className = "col";
        card.innerHTML = `
            <div class="card mb-2" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${tarefa.titulo}</h5>
                    <p class="card-text">${tarefa.descricao}</p>
                    <button class="btn btn-warning" onclick="editarTarefa(${index})"><i class="fa-solid fa-pencil"></i> Editar</button>
                    <button class="btn btn-danger" onclick="apagarTarefa(${index})"><i class="fa-solid fa-trash"></i> Apagar</button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Apagar tarefa
function apagarTarefa(index) {
    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    tarefas.splice(index, 1);
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
    exibirTarefas(); // Atualiza a lista
}

// Editar tarefa
function editarTarefa(index) {
    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    const novaTitulo = prompt("Editar título:", tarefas[index].titulo);
    const novaDescricao = prompt("Editar descrição:", tarefas[index].descricao);

    if (novaTitulo && novaDescricao) {
        tarefas[index].titulo = novaTitulo;
        tarefas[index].descricao = novaDescricao;
        localStorage.setItem("tarefas", JSON.stringify(tarefas));
        exibirTarefas();
    } else {
        alert("Edição cancelada.");
    }
}
