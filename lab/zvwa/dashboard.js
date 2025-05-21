let role = "";
let token = "";

function fazerLogin() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  fetch("https://zvwa-api.onrender.com/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password: senha })
  })
    .then(res => res.json())
    .then(data => {
      role = data.role;
      token = data.token;

      if (role === "admin") {
        document.getElementById("conteudo-admin").style.display = "block";
        carregarDadosAdmin();
      } else {
        document.getElementById("conteudo-user").style.display = "block";
      }

      document.getElementById("botao-secreto").style.display = "block";
    })
    .catch(err => {
      alert("Erro no login: " + err);
    });
}

function carregarDadosAdmin() {
  fetch("https://zvwa-api.onrender.com/api/dashboard/data", {
    headers: { "x-role": "admin" }
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById("dados-admin").textContent = JSON.stringify(data, null, 2);
    });
}

function acessarSegredo() {
  fetch("https://zvwa-api.onrender.com/api/dashboard/secret-data", {
    headers: { "x-role": role }
  })
    .then(async res => {
      const data = await res.json();
      if (!res.ok) {
        document.getElementById("segredo").textContent =
          `❌ Erro: ${data.error}`;
        return;
      }

      document.getElementById("segredo").textContent =
        `💣 Conteúdo secreto acessado!\n\n${JSON.stringify(data, null, 2)}`;
    });
}
