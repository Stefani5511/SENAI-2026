const modalFilme = document.getElementById("modalFilme");
var filmes = JSON.parse(localStorage.getItem("filmes")) || [];
renderizarTabela();

function salvarDadosLocalmente(){
    localStorage.setItem("filmes",JSON.stringify(filmes));
}

function abrirModal() {
    modalFilme.style.display = "block";
}

function fecharModal() {
    modalFilme.style.display = "none";
}

const cadFil = document.getElementById("cadFil");
cadFil.addEventListener("submit", f => {
    f.preventDefault();

    const file = cadFil.capa.files[0];
    const capaURL = URL.createObjectURL(file);

    const obj = {
        capa: capaURL,
        nome: cadFil.nome.value,
        genero: cadFil.genero.value,
        ano: cadFil.ano.value,
        classificacao: cadFil.classificacao.value,
        produtora: cadFil.produtora.value
    }

    filmes.push(obj);
    renderizarTabela();
    fecharModal();
    cadFil.reset();
    salvarDadosLocalmente();
});

function renderizarTabela(lista = filmes) {
    const dados = document.getElementById("dados");
    dados.innerHTML = "";

    lista.forEach((f, i) => {
        dados.innerHTML += `
        <tr>
            <td><img src="${f.capa}" width="120"></td>
            <td>${f.nome}</td>
            <td>${f.genero}</td>
            <td>${f.ano}</td>
            <td>${f.classificacao}</td>
            <td>${f.produtora}</td>
            <td><button onclick="excluir(${i})">Excluir</button></td>
        </tr>
        `;
    });
}

function filtrarGenero(){
    const genero = document.getElementById("filtroGenero").value.toLowerCase();

    const filtrados = filmes.filter(f =>
        f.genero.toLowerCase().includes(genero)
    );

    renderizarTabela(filtrados);
}

function excluir(indice) {
    filmes.splice(indice, 1);
    salvarDadosLocalmente();
    window.location.reload();
}