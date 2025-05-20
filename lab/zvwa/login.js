function login() {
  const user = document.getElementById('user').value;
  const pass = document.getElementById('pass').value;
  const output = document.getElementById("resposta");

  fetch("https://zvwa-api.onrender.com/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ user, pass })
  })
    .then(async res => {
      const data = await res.json();

      // Usuário não encontrado
      if (res.status === 404) {
        output.style.color = "red";
        output.textContent = "Usuário inexistente.";
        return;
      }

      // Senha errada para o usuário admin
      if (res.status === 401) {
        output.style.color = "green";
        output.textContent = "Senha do usuário admin está incorreta.";
        return;
      }

      // Sucesso no login
      output.style.color = "green";
      output.textContent = JSON.stringify(data, null, 2);
    })
    .catch(err => {
      output.style.color = "red";
      output.textContent = "Erro: " + err;
    });
}
