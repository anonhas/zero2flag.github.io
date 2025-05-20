function login() {
  const user = document.getElementById('user').value;
  const pass = document.getElementById('pass').value;

  fetch("https://zvwa-api.onrender.com/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ user, pass })
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById("resposta").textContent = JSON.stringify(data, null, 2);
    })
    .catch(err => {
      document.getElementById("resposta").textContent = "Erro: " + err;
    });
}
