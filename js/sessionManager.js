document.addEventListener("DOMContentLoaded", () => {
  const assistantData = localStorage.getItem("assistant");

  if (assistantData) {
    const assistant = JSON.parse(assistantData);

    // Cambiar nombre en el sidebar
    const sidebarName = document.querySelector("span.font-medium.text-gray-800");
    if (sidebarName) {
      sidebarName.textContent = `${assistant.name} ${assistant.lastName}`;
    }

    // Cambiar nombre en el título de bienvenida
    const welcomeTitle = document.querySelector("h1.text-4xl");
    if (welcomeTitle) {
      welcomeTitle.textContent = `Bienvenido ${assistant.name} ${assistant.lastName}`;
    }
  }
});
