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
      if (data.error) {
        if (data.error === "Usuário inexistente") {
          alert("Usuário inexistente.");
        } else {
          alert(`Senha do usuário ${email} está incorreta.`);
        }
        return;
      }

      localStorage.setItem("user", JSON.stringify(data));
      window.location.href = "dashboard.html";
    })
    .catch(() => {
      alert("Erro ao conectar com a API.");
    });
}
