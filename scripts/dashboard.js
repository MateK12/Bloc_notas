
let task_container = document.getElementById("task_container");
let boton_add = document.getElementById("btn_add");
function create_task(titulo,descripcion ,importancia,fecha) {
    let container = document.createElement("div");
    container.innerHTML = `<div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">${titulo}</h5>
      <p class="card-text">${descripcion}</p>
      <h4 class="card-subtitle mb-2 text-body-secondary">${importancia}</h4>
      <h6 class="card-subtitle mb-2 text-body-secondary">${fecha}</h6>
      <button type="button" class="btn btn-info">Editar</button>
      <button type="button" class="btn btn-danger">Eliminar</button>
      </div>
  </div>`
  task_container.appendChild(container);
}
boton_add.addEventListener("click",create_task);


// Ventana modal
var modal = document.getElementById("ventanaModal");

// Botón que abre el modal
var boton = document.getElementById("abrirModal");

// Hace referencia al elemento <span> que tiene la X que cierra la ventana
var span = document.getElementsByClassName("cerrar")[0];

// Cuando el usuario hace click en el botón, se abre la ventana
boton.addEventListener("click",function() {
  modal.style.display = "block";
});

// Si el usuario hace click en la x, la ventana se cierra
span.addEventListener("click",function() {
  modal.style.display = "none";
});