document.addEventListener('DOMContentLoaded', async () => {
  const tabla = document.getElementById('tabla-organizadores');

  try {
    const res = await fetch('http://localhost:8080/api/organizers');
    const organizadores = await res.json();

    organizadores.forEach(org => {
      const fila = document.createElement('tr');
      fila.className = 'border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700';
      fila.innerHTML = `
        <td class="p-4">${org.name}</td>
        <td class="p-4">${org.lastName}</td>
        <td class="p-4">${org.email}</td>
        <td class="p-4">${org.numberPhone}</td>
        <td class="p-4">${org.address}</td>
        <td class="p-4">
          <button class="editar-btn text-blue-600">Editar</button>
          <button class="eliminar-btn text-red-600">Eliminar</button>
        </td>
      `;
      tabla.appendChild(fila);

      fila.querySelector('.editar-btn').addEventListener('click', () => {
        const form = document.getElementById('form-organizador');
        form.name.value = org.name;
        form.lastName.value = org.lastName;
        form.email.value = org.email;
        form.password.value = org.password;
        form.numberPhone.value = org.numberPhone;
        form.birthDate.value = org.birthDate?.split('T')[0];
        form.address.value = org.address;
        form.dataset.editId = org.id;
        document.getElementById('guardarOrganizadorBtn').textContent = 'Actualizar Organizador';
        document.getElementById('createProductModal').classList.remove('hidden');
      });

      fila.querySelector('.eliminar-btn').addEventListener('click', async () => {
        if (confirm('¿Eliminar organizador?')) {
          await fetch(`http://localhost:8080/api/organizers/${org.id}`, { method: 'DELETE' });
          location.reload();
        }
      });
    });
  } catch (err) {
    console.error(err);
  }
});

document.getElementById('form-organizador').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const id = form.dataset.editId;

  const organizador = {
    name: form.name.value,
    lastName: form.lastName.value,
    email: form.email.value,
    password: form.password.value,
    numberPhone: parseInt(form.numberPhone.value),
    birthDate: form.birthDate.value,
    address: form.address.value
  };

  const url = id ? `http://localhost:8080/api/organizers/${id}` : 'http://localhost:8080/api/organizers';
  const method = id ? 'PUT' : 'POST';

  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(organizador)
  });

  if (res.ok) {
    alert(id ? 'Organizador actualizado' : 'Organizador creado');
    form.reset();
    delete form.dataset.editId;
    document.getElementById('guardarOrganizadorBtn').textContent = 'Guardar';
    location.reload();
  } else {
    alert('Error en la operación');
  }
});
