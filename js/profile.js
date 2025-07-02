async function actualizarDatos(event) {
  event.preventDefault();

  const stored = localStorage.getItem("loggedAssistant");
  if (!stored) {
    alert("No hay sesión iniciada");
    return;
  }

  const actual = JSON.parse(stored); // datos existentes del usuario
  const updated = {
    name: document.getElementById("name").value.trim() || actual.name,
    lastName: document.getElementById("last-name").value.trim() || actual.lastName,
    email: document.getElementById("email").value.trim() || actual.email,
    password: document.getElementById("password").value.trim() || actual.password,
    numberPhone: document.getElementById("phone-number").value.trim() || actual.numberPhone,
    birthDate: document.getElementById("date-of-birth").value || actual.birthDate,
  };

  try {
    const response = await fetch(`http://localhost:8080/api/assistants/${actual.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });

    if (response.ok) {
      const result = await response.json();
      localStorage.setItem("loggedAssistant", JSON.stringify(result)); // actualiza localStorage
      alert("Datos actualizados");
    } else {
      const error = await response.text();
      alert("Error al actualizar: " + error);
    }
  } catch (error) {
    console.error("Error en la petición:", error);
  }
}
