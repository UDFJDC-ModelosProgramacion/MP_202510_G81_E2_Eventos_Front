document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita el envío tradicional del formulario

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!email || !password) {
      alert('Por favor, ingrese correo y contraseña.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/assistants/email/${encodeURIComponent(email)}`);

      if (!response.ok) {
        throw new Error('Usuario no encontrado');
      }

      const assistant = await response.json();

      if (assistant.password !== password) {
        alert('Contraseña incorrecta');
        return;
      }

      // Guardar la info del usuario en localStorage
      localStorage.setItem('loggedAssistant', JSON.stringify(assistant));

      // Redirigir a la página del usuario
      window.location.href = 'user/user.html';

    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Correo no registrado o error del servidor');
    }
  });
});
