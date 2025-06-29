function logout() {
  localStorage.removeItem("assistant");
  window.location.href = "login.html"; // Cambia esto si usas otro nombre de archivo
}
