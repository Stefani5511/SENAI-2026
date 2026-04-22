const API = "http://localhost:3000";

async function carregarEventos() {
  const lista = document.getElementById("lista");
  if (!lista) return;

  const res = await fetch(`${API}/eventos`);
  const eventos = await res.json();

  lista.innerHTML = "";

  eventos.forEach(e => {
    lista.innerHTML += `
      <div class="card">
        <button class="lixeira" onclick="excluir(${e.id})">🗑️</button>

        <h3>${e.titulo}</h3>
        <p>${e.local}</p>

        <button onclick="ver(${e.id})">Ver</button>
      </div>
    `;
  });
}

function ver(id) {
  window.location.href = `detalhe.html?id=${id}`;
}

async function excluir(id) {
  if (!confirm("Excluir evento?")) return;

  await fetch(`${API}/eventos/${id}`, {
    method: "DELETE"
  });

  carregarEventos();
}

function abrirModal() {
  document.getElementById("modal").classList.remove("oculto");
}

function fecharModal() {
  document.getElementById("modal").classList.add("oculto");
}

async function criarEvento() {
  const evento = {
    titulo: document.getElementById("titulo").value,
    descricao: document.getElementById("descricao").value,
    data_evento: document.getElementById("data").value,
    local: document.getElementById("local").value,
    capacidade_maxima: Number(document.getElementById("capacidade").value)
  };

  await fetch(`${API}/eventos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(evento)
  });

  fecharModal();
  carregarEventos();
}

function getId() {
  return new URLSearchParams(window.location.search).get("id");
}

async function carregarDetalhe() {
  const id = getId();
  if (!id) return;

  const res = await fetch(`${API}/eventos/${id}`);
  const e = await res.json();

  document.getElementById("titulo").innerText = e.titulo;
  document.getElementById("descricao").innerText = e.descricao;
  document.getElementById("local").innerText = e.local;

  carregarImagens();
}

async function carregarImagens() {
  const id = getId();

  const res = await fetch(`${API}/imagens/${id}`);
  const imagens = await res.json();

  const galeria = document.getElementById("galeria");
  galeria.innerHTML = "";

  imagens.forEach(img => {
    galeria.innerHTML += `<img src="${img.url}">`;
  });
}

async function uploadImagem(event) {
  const file = event.target.files[0];
  const id = getId();

  const formData = new FormData();
  formData.append("file", file);

  await fetch(`${API}/imagens/${id}`, {
    method: "POST",
    body: formData
  });

  carregarImagens();
}

window.onload = () => {
  carregarEventos();
  carregarDetalhe();
};