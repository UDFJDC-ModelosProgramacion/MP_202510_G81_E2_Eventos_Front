document.querySelector('form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const emailInput = document.getElementById('email');

  const data = {
    name: document.getElementById('nombre').value,
    lastName: document.getElementById('apellido').value,
    email: emailInput.value,
    birthDate: document.getElementById('nacimiento').value,
    numberPhone: document.getElementById('numero').value,
    password: document.getElementById('password').value
  };

  try {
    const response = await fetch('http://localhost:8080/api/assistants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      alert('✅ Registro exitoso. Serás redirigido al inicio de sesión.');
      window.location.href = 'login.html';
    } else {
      const errorMessage = await response.text(); // respuesta del GlobalExceptionHandler como texto
      alert('⚠️ Error: ' + errorMessage);

      if (errorMessage.includes('correo')) {
        // Borra solo el campo del correo
        emailInput.value = '';
        emailInput.focus();
      }
    }
  } catch (error) {
    console.error('Error:', error);
    alert('❌ Error de conexión con el servidor.');
  }
});

