
const modal = document.querySelector('.modal-container2')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sCodigo = document.querySelector('#m-codigo')
const sQuantidade = document.querySelector('#m-quantidade')
const sValor = document.querySelector('#m-valor')
const sData = document.querySelector('#m-data')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container2') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sCodigo.value = itens[index].codigo
    sNome.value = itens[index].nome
    sQuantidade.value = itens[index].quantidade
    sValor.value = itens[index].valor
    sData.value = itens[index].data
    id = index
  } else {
    sCodigo.value = ''
    sNome.value = ''
    sQuantidade.value = ''
    sValor.value = ''
    sData.value = ''
  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.codigo}</td>
    <td>${item.nome}</td>
    <td>${item.quantidade}</td>
    <td>R$ ${item.valor}</td>
    <td>${item.data}</td>
    <td class="acao">
      <button onclick="editItem(${index})">✍️<i></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})">🗑️<i></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (sCodigo.value == '' || sNome.value == '' || sQuantidade.value == '' || sValor.value == '' || sData.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = sNome.value
    itens[id].codigo = sCodigo.value
    itens[id].quantidade = sQuantidade.value
    itens[id].valor = sValor.value
    itens[id].data = sData.value
  } else {
    itens.push({'codigo': sCodigo.value, 'nome': sNome.value, 'quantidade': sQuantidade.value, 'valor': sValor.value, 'data': sData.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()