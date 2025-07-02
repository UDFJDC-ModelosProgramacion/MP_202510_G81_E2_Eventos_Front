document.addEventListener('DOMContentLoaded', async () => {
  const tabla = document.getElementById('tabla-eventos');
  const selectLocaciones = document.getElementById('locationId');
  const selectOrganizadores = document.getElementById('organizerId');

  const cargarSelects = async () => {
    const [locs, orgs] = await Promise.all([
      fetch('http://localhost:8080/api/locations').then(r => r.json()),
      fetch('http://localhost:8080/api/organizers').then(r => r.json())
    ]);

    selectLocaciones.innerHTML = locs.map(l => `<option value="${l.id}">${l.name}</option>`).join('');
    selectOrganizadores.innerHTML = orgs.map(o => `<option value="${o.id}">${o.name}</option>`).join('');
  };

  const cargarEventos = async () => {
    const res = await fetch('http://localhost:8080/api/events');
    const eventos = await res.json();

    tabla.innerHTML = '';
    eventos.forEach(ev => {
      const fila = document.createElement('tr');
      fila.className = 'border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700';
      fila.innerHTML = `
        <td class="p-4">${ev.name}</td>
        <td class="p-4">${ev.category}</td>
        <td class="p-4">${new Date(ev.date).toLocaleString()}</td>
        <td class="p-4">${ev.location?.name || 'Sin locación'}</td>
        <td class="p-4">${ev.organizer?.name || 'Sin organizador'}</td>
        <td class="p-4">
          <button class="editar-btn py-1 px-3 bg-primary-700 text-white rounded">Editar</button>
          <button class="eliminar-btn py-1 px-3 text-red-600 border border-red-600 rounded hover:bg-red-600 hover:text-white">Eliminar</button>
        </td>
      `;
      tabla.appendChild(fila);

      fila.querySelector('.editar-btn').addEventListener('click', () => {
        const form = document.getElementById('form-evento');
        form.name.value = ev.name;
        form.category.value = ev.category;
        form.date.value = ev.date.slice(0, 16);
        form.locationId.value = ev.location?.id || '';
        form.organizerId.value = ev.organizer?.id || '';
        form.dataset.editId = ev.id;
        document.getElementById('guardarBtn').textContent = 'Actualizar Evento';
        document.getElementById('createProductModal').classList.remove('hidden');
      });

      fila.querySelector('.eliminar-btn').addEventListener('click', async () => {
        if (confirm('¿Eliminar este evento?')) {
          const res = await fetch(`http://localhost:8080/api/events/${ev.id}`, { method: 'DELETE' });
          if (res.ok) location.reload();
          else alert('Error al eliminar');
        }
      });
    });
  };

  await cargarSelects();
  await cargarEventos();
});

document.getElementById('form-evento').addEventListener('submit', async e => {
  e.preventDefault();
  const form = e.target;
  const id = form.dataset.editId;

  const evento = {
  name: form.name.value,
  category: form.category.value,
  date: form.date.value,
  location: { id: form.locationId.value },
  organizer: { id: form.organizerId.value }
};


  const res = await fetch(id ? `http://localhost:8080/api/events/${id}` : 'http://localhost:8080/api/events', {
    method: id ? 'PUT' : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(evento)
  });

  if (res.ok) {
    alert(id ? 'Evento actualizado' : 'Evento creado');
    form.reset();
    delete form.dataset.editId;
    document.getElementById('guardarBtn').textContent = 'Guardar Evento';
    document.getElementById('createProductModal').classList.add('hidden');
    location.reload();
  } else {
    alert(await res.text());
  }
});

document.querySelector('button[type="reset"]').addEventListener('click', () => {
  const form = document.getElementById('form-evento');
  form.reset();
  delete form.dataset.editId;
  document.getElementById('guardarBtn').textContent = 'Guardar Evento';
});
