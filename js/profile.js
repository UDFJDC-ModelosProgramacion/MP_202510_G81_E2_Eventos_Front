async function actualizarDatos() {

    const assistantData = localStorage.getItem("assistant");
    const id = assistant.id;

  let asistente = {
    name: document.getElementById("name").value.trim(),
    lastName: document.getElementById("last-name").value.trim(),
    email: document.getElementById("email").value.trim(),
    password: document.getElementById("password").value.trim(),
    numberPhone: document.getElementById("phone-number").value.trim(),
    birthDate: document.getElementById("date-of-birth").value // formato: "YYYY-MM-DD"
  };

  try {
    const response = await fetch(`http://localhost:8080/api/assistants/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(asistente)
    });

    if (response.ok) {
      const resultado = await response.json();
      alert("Assistant updated successfully");
      console.log(resultado);
    } else {
      const error = await response.text();
      alert("Error updating: " + error);
    }
  } catch (error) {
    console.error("Request error:", error);
  }
}
