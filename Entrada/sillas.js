
  const coliseo = document.getElementById("coliseo");
  const lista = document.getElementById("lista");
  const total = document.getElementById("total");
  const centerX = 300;
  const centerY = 300;
  const radioBase = 80;

  let datosSillas = [];

  for (let fila = 0; fila < 10; fila++) {
    const radio = radioBase + fila * 22;
    const sillasEnFila = 16 + fila * 6;

    for (let i = 0; i < sillasEnFila; i++) {
      const angulo = (2 * Math.PI * i) / sillasEnFila;
      const x = centerX + radio * Math.cos(angulo);
      const y = centerY + radio * Math.sin(angulo);

      const silla = document.createElement("div");
      silla.classList.add("silla");

      const idSilla = `F${fila + 1}-S${i + 1}`;
      const precio = Math.floor(Math.random() * 20 + 10) * 1000; // Ej: $10000 - $29000

      silla.dataset.id = idSilla;
      silla.dataset.precio = precio;

      if (Math.random() < 0.07) {
        silla.classList.add("ocupada");
      }

      silla.style.left = `${x}px`;
      silla.style.top = `${y}px`;

      silla.addEventListener("click", () => {
        if (silla.classList.contains("ocupada")) return;
        silla.classList.toggle("seleccionada");
        actualizarLista();
      });

      coliseo.appendChild(silla);
    }
  }

  function actualizarLista() {
    const seleccionadas = document.querySelectorAll(".silla.seleccionada");
    lista.innerHTML = "";
    let suma = 0;

    seleccionadas.forEach((silla) => {
      const id = silla.dataset.id;
      const precio = parseInt(silla.dataset.precio);
      suma += precio;

      const item = document.createElement("div");
      item.innerHTML = `<span>${id}</span><span>$${precio.toLocaleString()}</span>`;
      lista.appendChild(item);
    });

    total.textContent = `Total: $${suma.toLocaleString()}`;
  }
