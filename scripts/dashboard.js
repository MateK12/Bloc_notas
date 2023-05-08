let API = "http://127.0.0.1:5000";

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

//Funcion para crear plantilla
let task_container = document.getElementById("task_container");
let boton_add = document.getElementById("btn_add");
function create_task(titulo,descripcion ,importancia,fecha) {
    let container = document.createElement("div");
    container.innerHTML = `<div>
    <div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">${titulo}</h5>
      <p class="card-text">${descripcion}</p>
      <h4 class="card-subtitle mb-2 text-body-secondary">${importancia}</h4>
      <h6 class="card-subtitle mb-2 text-body-secondary">${fecha}</h6>
      <button type="button" class="btn btn-info">Editar</button>
      <button type="button" class="btn btn-danger">Eliminar</button>
      </div>
  </div>
  </div> <br>`
  container.className = "col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12";  
  task_container.appendChild(container);
}
boton_add.addEventListener("click",create_task);

//DDDDDDDDDDDDD
let importancia_VM = document.getElementById("importancia_VM");
let nombre_VM = document.getElementById("nombre_VM");
let descripcion_VM = document.getElementById("descripcion_VM");
let btn_VM = document.getElementById("btn_VM");

btn_VM.addEventListener("click",async function  handle_submit(e) {
  e.preventDefault()
  let importancia = importancia_VM.value;
  let nombre = nombre_VM.value;
  let descripcion = descripcion_VM.value;
  let id_usuario = localStorage.getItem('id_usuario');
  const respuesta = await fetch(`${API}/Agregar_tareas`,{
    method:["POST"],
    headers:{"Content-Type":"application/json"
  },
  body: JSON.stringify ({
    importancia,
    nombre,
    descripcion,
    id_usuario
  })
  })
  
      let res = await respuesta.json();
      console.log(res);
  if (res.creacion) {
    for (let i = 0; i < res.nombre.length; i++) {
    create_task(res.nombre[i],res.descripcion[i],res.importancia[i],res.fecha[i])      
    }
  }
  else{
      mensaje.innerHTML = "Cuenta no existente"
  }
})

//cerrar sesion
let cerrar_sesion = document.getElementById("btn_CerrarSesion");
cerrar_sesion.addEventListener("click",()=>{
  localStorage.removeItem('id_usuario');
})


let probar = document.getElementById("probar");
probar.addEventListener("click",create_task)