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
      if (!res.ok) {
        if (res.status === 404) {
          output.style.color = "red";
          output.textContent = "Usuário inexistente.";
        } else if (res.status === 401) {
          output.style.color = "orange";
          output.textContent = `Senha do usuário admin está incorreta.\nDica do backend: ${data.dica}`;
        }
        return;
      }

      output.style.color = "green";
      output.textContent = JSON.stringify(data, null, 2);
    })
    .catch(err => {
      output.style.color = "red";
      output.textContent = "Erro: " + err;
    });
}
