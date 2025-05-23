const user = JSON.parse(localStorage.getItem("user"));
if (!user) {
  alert("Acesso negado. Faça login primeiro.");
  window.location.href = "login.html";
}
const role = user.role;

// Exibe painel conforme role
if (role === "admin") {
  document.getElementById("painel-admin").style.display = "block";
  document.getElementById("botao-secreto").style.display = "block";
  fetch("https://zvwa-api.onrender.com/api/dashboard/data", {
    headers: { "x-role": "admin" }
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById("dados-admin").textContent =
        JSON.stringify(data, null, 2);
    });
} else {
  document.getElementById("painel-user").style.display = "block";
  document.getElementById("botao-secreto").style.display = "block";
  document.getElementById("painel-master").style.display = "block";
}

document.getElementById("bemvinda").textContent = `Bem-vindo, ${user.email}`;

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
    });
}

// Vulnerabilidade de XSS refletido realista
function fazerBusca() {
  const termo = document.getElementById("campo-busca").value;
  const resultadoDiv = document.getElementById("resultado-busca");

  // Reflete o termo bruto diretamente
  resultadoDiv.innerHTML = termo;

  // Agora percorre as tags <script> injetadas e as executa
  const scripts = resultadoDiv.querySelectorAll("script");
  scripts.forEach(oldScript => {
    const code = oldScript.textContent.trim();

    // Se for o payload de teste, exibe a flag
    if (code === "alert('1')" || code === "alert(1)") {
      alert("🎯 FLAG: Z2F{xss_search_reflected}");
    } else {
      // Senão, executa normalmente o script injetado
      const s = document.createElement("script");
      s.text = code;
      document.body.appendChild(s);
    }

    // Remove a tag original
    oldScript.remove();
  });
}
