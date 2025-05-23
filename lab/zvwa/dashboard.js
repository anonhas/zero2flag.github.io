
const user = JSON.parse(localStorage.getItem("user"));
if (!user) {
  alert("Acesso negado. Faça login primeiro.");
  window.location.href = "login.html";
}
const role = user.role;
if (role === "admin") {
  document.getElementById("painel-admin").style.display = "block";
  document.getElementById("botao-secreto").style.display = "block";
  document.getElementById("painel-master").style.display = "block";
  fetch("https://zvwa-api.onrender.com/api/dashboard/data", {
    headers: { "x-role": "admin" }
  }).then(res => res.json())
    .then(data => {
      document.getElementById("dados-admin").textContent = JSON.stringify(data, null, 2);
    });
} else {
  document.getElementById("painel-user").style.display = "block";
  document.getElementById("botao-secreto").style.display = "block";
}

function acessarSegredo() {
  fetch("https://zvwa-api.onrender.com/api/dashboard/secret-data", {
    headers: { "x-role": role }
  })
    .then(async res => {
      const data = await res.json();
      const destino = document.getElementById("segredo");
      if (!res.ok) {
        destino.textContent = "Erro: " + data.error;
        return;
      }
      destino.textContent = JSON.stringify(data, null, 2);
      if (data.flag) {
        destino.innerHTML += "\n\n🎯 FLAG: " + data.flag;
      }
    });
}

function fazerBusca() {
  const termo = document.getElementById("campo-busca").value;

  // Se for o payload clássico, troca pelo que revela a flag
  if (termo === "<script>alert('1')</script>" || termo === "<script>alert(1)</script>") {
    document.getElementById("resultado-busca").innerHTML = `<script>alert('🎯 FLAG: Z2F{xss_search_reflected}')</script>`;
    return;
  }

  // Reflete normalmente (mantendo vulnerabilidade)
  document.getElementById("resultado-busca").innerHTML = termo;
}
