document.addEventListener('DOMContentLoaded', async () => {
  const tabla = document.getElementById('tabla-locaciones');

  try {
    const res = await fetch('http://localhost:8080/api/locations');
    const locaciones = await res.json();

    locaciones.forEach(loc => {
      const fila = document.createElement('tr');
      fila.className = 'border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700';
      fila.innerHTML = `
        <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          <div class="flex items-center mr-3">
            <img src="https://flowbite.s3.amazonaws.com/blocks/application-ui/products/imac-front-image.png" alt="Icon" class="h-8 w-auto mr-3">
            ${loc.name}
          </div>
        </th>
        <td class="px-4 py-3">${loc.type}</td>
        <td class="px-4 py-3">${loc.location}</td>
        <td class="px-4 py-3">${loc.capacity}</td>
        <td class="px-4 py-3">
          <div class="flex items-center space-x-4">
            <button class="editar-btn py-2 px-3 text-sm text-white bg-primary-700 rounded-lg hover:bg-primary-800">Editar</button>
            <button class="eliminar-btn py-2 px-3 text-sm text-red-600 border border-red-600 rounded-lg hover:bg-red-600 hover:text-white">Eliminar</button>
          </div>
        </td>
      `;
      tabla.appendChild(fila);

      // BOTÓN EDITAR
      fila.querySelector('.editar-btn').addEventListener('click', () => {
  const form = document.getElementById('form-locacion');
  form.name.value = loc.name;
  form.location.value = loc.location;
  form.type.value = loc.type;
  form.capacity.value = loc.capacity;
  form.dataset.editId = loc.id;

  document.getElementById('guardarBtn').textContent = 'Actualizar Locación';

  // Mostrar el modal
  document.getElementById('createProductModal').classList.remove('hidden');

});



      // BOTÓN ELIMINAR
      fila.querySelector('.eliminar-btn').addEventListener('click', async () => {
        if (confirm('¿Estás seguro de eliminar esta locación?')) {
          try {
            const res = await fetch(`http://localhost:8080/api/locations/${loc.id}`, {
              method: 'DELETE'
            });
            if (res.ok) {
              alert('Locación eliminada');
              location.reload();
            } else {
              alert('Error al eliminar');
            }
          } catch (err) {
            console.error('Error al eliminar:', err);
          }
        }
      });

    });

  } catch (err) {
    console.error('Error al cargar locaciones:', err);
  }
});

document.getElementById('form-locacion').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const id = form.dataset.editId;

  const locacion = {
    name: form.name.value,
    location: form.location.value,
    type: form.type.value,
    capacity: parseInt(form.capacity.value)
  };

  const url = id
    ? `http://localhost:8080/api/locations/${id}`
    : 'http://localhost:8080/api/locations';
  const method = id ? 'PUT' : 'POST';

  try {
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(locacion)
    });

    if (res.ok) {
      alert(id ? 'Locación actualizada' : 'Locación creada');

      // Reset form
      form.reset();
      delete form.dataset.editId;
      document.getElementById('guardarBtn').textContent = 'Guardar Locación';
      // Mostrar el modal
document.getElementById('createProductModal').classList.remove('hidden');


      location.reload(); // para ver los cambios
    } else {
      alert(await res.text());
    }
  } catch (err) {
    console.error(err);
  }
});

document.querySelector('button[type="reset"]').addEventListener('click', () => {
  const form = document.getElementById('form-locacion');
  form.reset();
  delete form.dataset.editId;
  document.getElementById('guardarBtn').textContent = 'Guardar Locación';
});
