document.getElementById("openLogin")?.addEventListener("click", () => {
  document.getElementById("loginModal").style.display = "block";
});
document.getElementById("closeLogin")?.addEventListener("click", () => {
  document.getElementById("loginModal").style.display = "none";
});
function fazerLogin() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  if (email === "admin@tere.com" && senha === "senha123") {
    alert("Acesso permitido!");
    window.location.href = "admin.html";
  } else {
    alert("Email ou senha incorretos!");
  }
}