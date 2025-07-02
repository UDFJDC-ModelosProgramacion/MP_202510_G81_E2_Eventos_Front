document.addEventListener('DOMContentLoaded', () => {
    // Obtener los datos del usuario del localStorage
    const loggedAssistant = JSON.parse(localStorage.getItem('loggedAssistant'));
    
    if (!loggedAssistant) {
        console.warn('No hay sesión activa');
        return;
    }

    // Actualizar el nombre del usuario en el header
    const userNameElement = document.querySelector('.flex.items-center.ml-4 span');
    if (userNameElement) {
        userNameElement.textContent = loggedAssistant.name + ' ' + loggedAssistant.lastName;
    } else {
        console.error('No se encontró el elemento para mostrar el nombre de usuario');
    }
    const welcomeHeading = document.querySelector('h1.text-4xl');
  if (welcomeHeading) {
    welcomeHeading.textContent = `Bienvenido ${loggedAssistant.name} ${loggedAssistant.lastName}`;
  }
});