document.querySelector("#salvar").addEventListener("click", cadastrar)

let lista_tarefas = []

window.addEventListener("load", () => {
  lista_tarefas = JSON.parse(localStorage.getItem("lista_tarefas")) || []
  atualizar()
})

document.querySelector("#pendentes").addEventListener("click", () => {
  lista_tarefas = JSON.parse(localStorage.getItem("lista_tarefas")) || []
  lista_tarefas = lista_tarefas.filter(tarefa => tarefa.concluida == false)
  atualizar()
})

document.querySelector("#home").addEventListener("click", () => {
  lista_tarefas = JSON.parse(localStorage.getItem("lista_tarefas")) || []
  lista_tarefas = lista_tarefas
  atualizar()
})

document.querySelector("#busca").addEventListener("keyup", () => {
  const titulo = document.querySelector("#busca").value
  lista_tarefas = lista_tarefas.filter(tarefa => tarefa.titulo.includes(titulo))
  atualizar()
})

function cadastrar() {
  const modal = bootstrap.Modal.getInstance(document.querySelector("#exampleModal"))
  let titulo = document.querySelector("#titulo").value
  let descricao = document.querySelector("#descricao").value
  let temporadas = document.querySelector("#temporadas").value
  let categoria = document.querySelector("#categoria").value
  let medicamento = document.querySelector("#medicamento").value
  let quantidade = document.querySelector("#quantidade").value


  const tarefa = {
    id: Date.now(),
    titulo: titulo,
    descricao: descricao,
    temporadas: temporadas,
    categoria: categoria,
    concluida: false,
    medicamento: medicamento,
    quantidade: quantidade
  }

  if (tarefa.titulo.length == 0) {
    document.querySelector("#titulo").classList.add("is-invalid")
    return
  }

  if (tarefa.categoria == "Score") {
    document.querySelector("#categoria").classList.add("is-invalid")
    return
  }

  if (tarefa.medicamento == "Medicamento") {
    document.querySelector("#medicamento").classList.add("is-invalid")
    return
  }

  lista_tarefas.push(tarefa)

  document.querySelector("#tarefas").innerHTML += gerarCard(tarefa)
  document.querySelector("#titulo").value = ""
  document.querySelector("#descricao").value = ""
  document.querySelector("#temporadas").value = ""
  document.querySelector("#medicamento").value = ""
  document.querySelector("#quantidade").value = ""


  salvar()
  modal.hide()
}

function atualizar() {
  document.querySelector("#tarefas").innerHTML = ""
  lista_tarefas.forEach((tarefa) => {
    document.querySelector("#tarefas").innerHTML += gerarCard(tarefa)
  })
}

function salvar() {
  localStorage.setItem("lista_tarefas", JSON.stringify(lista_tarefas))
}

function apagar(id) {
  lista_tarefas = lista_tarefas.filter((tarefa) => { //isso é igual &
    return tarefa.id != id
  })
  salvar()
  atualizar()
}

function gerarCard(tarefa) {

  const disabled = (tarefa.concluida) ? "disabled" : "" //Depois do "?" é quando for verdadeiro, depois do ":" é quando falso

  let corCategoria = "warning"
  if (tarefa.categoria == "Alto riso (4-20)") corCategoria = "danger"
  if (tarefa.categoria == "Baixo risco (0-3)") corCategoria = "info"

  return `<div class="col-12 col-md-6 col-lg-3">
    <div class="card mb-2">
      <div class="card-header">${tarefa.titulo}</div>
      <div class="card-body">
        <p class="card-text">${tarefa.descricao}</p>
        <p>
          <span class="badge text-bg-${corCategoria}">${tarefa.categoria}</span>
        </p>
        <p>${tarefa.temporadas} Anos</p>
        <p>${tarefa.medicamento} ${tarefa.quantidade}mg</p>
        
        <a href="#" onClick='apagar(${tarefa.id})' class="btn btn-danger">
          <i class="bi bi-x-lg"></i>
        </a>
      </div>
    </div>
  </div>
`
}