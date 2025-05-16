function login() {
  const user = document.getElementById('user').value;
  const pass = document.getElementById('pass').value;

  // Vulnerabilidade: se usuário for "admin", qualquer senha é aceita
  const resposta = {
    success: user === 'admin',
    token: btoa(user + ":" + pass),
    message: user === 'admin' ? "Bem-vindo, admin!" : "Credenciais inválidas"
  };

  document.getElementById('resposta').textContent = JSON.stringify(resposta, null, 2);
}
