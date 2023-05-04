
let task_container = document.getElementById("task_container")
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
  task_container.appendChild(container)
}
for (let i = 0; i < 6; i++) {
    create_task()
}
