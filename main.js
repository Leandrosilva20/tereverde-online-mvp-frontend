const modal = document.getElementById('loginModal');
const openBtn = document.getElementById('openLogin');
const closeBtn = document.getElementById('closeLogin');
openBtn.onclick = () => modal.style.display = 'flex';
closeBtn.onclick = () => modal.style.display = 'none';
window.onclick = (e) => { if (e.target == modal) modal.style.display = 'none'; };
function fazerLogin() {
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  if (email === 'admin@tere.com' && senha === 'senha123') {
    alert('Login realizado com sucesso!');
    modal.style.display = 'none';
  } else {
    alert('Credenciais inválidas!');
  }
}