const url = 'http://localhost:3000';
const produtos = [];

carregarProdutos();

function carregarProdutos(){
  fetch(url + '/produto')
  .then(response => response.json())
  .then(data =>{
    produtos.length = 0;
    produtos.push(...data);
    listarCards();
  })
  .catch(() => alert('Erro na API'));
}

function listarCards(){
  const container = document.querySelector('#produtos');
  container.innerHTML = '';

  produtos.forEach(produto =>{
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
      <h3>${produto.nome}</h3>
      <img src="${produto.imagem}">
      <p>Categoria: ${produto.categoria}</p>
      <p>Marca: ${produto.marca}</p>
      <p>R$ ${produto.preco}</p>
    `;

    container.appendChild(card);
  });
}

document.querySelector('#formProduto').addEventListener('submit', function(e){
  e.preventDefault();

  const novoProduto = {
    nome: nome.value,
    preco: Number(preco.value),
    categoria: categoria.value,
    marca: marca.value,
    imagem: imagem.value
  };

  fetch(url + '/produto',{
    method: 'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body: JSON.stringify(novoProduto)
  })
  .then(()=>{
    alert("Produto cadastrado!");
    cadastro.classList.add('oculto');
    formProduto.reset();
    carregarProdutos();
  })
  .catch(()=> alert("Erro ao cadastrar"));
});