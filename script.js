// Espera o conteúdo da página carregar antes de executar o script
document.addEventListener("DOMContentLoaded", function () {
    // Verifica em qual página o usuário está
    if (window.location.pathname.includes("pagina3.html")) {
        setupCriarTarefa(); // Se for a página de criar tarefa, ativa a função de criação
    } else if (window.location.pathname.includes("pagina4.html")) {
        exibirTarefas(); // Se for a página de exibir tarefas, mostra as tarefas salvas
    }
});

// Função para configurar a criação de tarefas na página 3
function setupCriarTarefa() {
    // Seleciona o botão de criar tarefa e os campos de título e descrição
    const btnCriar = document.querySelector("button[onclick='btnCria']");
    const inputTitulo = document.getElementById("tituloTarefa");
    const inputDescricao = document.getElementById("descricao");

    // Adiciona evento de clique ao botão de criar tarefa
    btnCriar.addEventListener("click", function () {
        // Pega os valores digitados e remove espaços extras
        const titulo = inputTitulo.value.trim();
        const descricao = inputDescricao.value.trim();

        // Valida se os campos estão preenchidos
        if (!titulo || !descricao) {
            alert("Preencha todos os campos!");
            return;
        }

        // Recupera as tarefas já salvas no localStorage (ou cria um array novo)
        let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

        // Adiciona a nova tarefa ao array
        tarefas.push({ titulo, descricao });

        // Salva o array atualizado no localStorage
        localStorage.setItem("tarefas", JSON.stringify(tarefas));

        // Limpa os campos do formulário e avisa o usuário
        inputTitulo.value = "";
        inputDescricao.value = "";
        alert("Tarefa criada com sucesso!");
    });
}

// Função para exibir as tarefas na página 4
function exibirTarefas() {
    // Recupera as tarefas do localStorage
    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    // Seleciona o container onde os cards das tarefas serão exibidos
    const container = document.querySelector(".container .row");

    container.innerHTML = ""; // Limpa o conteúdo anterior do container

    // Para cada tarefa, cria um card com título, descrição e botões de editar/apagar
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
        container.appendChild(card); // Adiciona o card ao container
    });
}

// Função para apagar uma tarefa pelo índice
function apagarTarefa(index) {
    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    tarefas.splice(index, 1); // Remove a tarefa do array
    localStorage.setItem("tarefas", JSON.stringify(tarefas)); // Atualiza o localStorage
    exibirTarefas(); // Atualiza a lista exibida
}

// Função para editar uma tarefa pelo índice
function editarTarefa(index) {
    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    // Pede ao usuário os novos valores para título e descrição
    const novaTitulo = prompt("Editar título:", tarefas[index].titulo);
    const novaDescricao = prompt("Editar descrição:", tarefas[index].descricao);

    // Se o usuário não cancelar, atualiza a tarefa
    if (novaTitulo && novaDescricao) {
        tarefas[index].titulo = novaTitulo;
        tarefas[index].descricao = novaDescricao;
        localStorage.setItem("tarefas", JSON.stringify(tarefas)); // Salva as alterações
        exibirTarefas(); // Atualiza a lista exibida
    } else {
        alert("Edição cancelada.");
    }
}