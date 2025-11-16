function fazerLogin() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  if (email === "admin@tere.com" && senha === "senha123") {
    alert("Acesso permitido!");
    window.location.href = "./painel.html";
  } else {
    alert("Email ou senha incorretos.");
  }
}

// Modal Login
const modal = document.getElementById("loginModal");
const openBtn = document.getElementById("openLogin");
const closeBtn = document.getElementById("closeLogin");

if (openBtn) openBtn.onclick = () => modal.style.display = "block";
if (closeBtn) closeBtn.onclick = () => modal.style.display = "none";

window.onclick = (e) => {
  if (e.target === modal) modal.style.display = "none";
};
