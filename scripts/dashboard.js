let API = "http://127.0.0.1:5000";





//Funcion para crear plantilla
let task_container = document.getElementById("task_container");
let boton_add = document.getElementById("btn_add");
function create_task(titulo,descripcion ,importancia,fecha = "ahora",id=localStorage.getItem("id_usuario")+1) {
    let container = document.createElement("div");
    container.innerHTML = `
    <br>
    <div>
    <div class="card" style="width: 20 rem;">
    <div class="card-body">
      <h2 class="card-title">${titulo}</h2>
      <p class="card-text">${descripcion}</p>
      <h3 class="card-subtitle mb-2 text-body-secondary">${importancia}</h3>
      <h4 class="card-subtitle mb-2 text-body-secondary">${fecha}</h4>
      <h6 id="h6_id" class="card-subtitle mb-2 text-body-secondary">${id}</h6>
      <button onclick=Editar_Tarea_Redireccion(${id}) id="abrirModalEditar" type="button" class="btn btn-info">Editar</button>
      <button type="button" class="btn btn-danger">Eliminar</button>
      </div>
  </div>
  </div> <br>`
  container.className = "col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12";  
  task_container.appendChild(container);
  let btn_editar = document.querySelector("abrirModalEditar");
}
boton_add.addEventListener("click",create_task);



async function Obtener_tareas(id) {
  let respuesta = await fetch(`${API}/Obtener_tareas`,{
    method:["POST"],
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      id
    })
  })
  res = await respuesta.json()
  console.log(res);
  localStorage.setItem("tareas",res);
  if (res.creacion) {
    for (let i = 0; i < res.nombre.length; i++) {
    create_task(res.nombre[i],res.descripcion[i],res.importancia[i],res.fecha[i],res.id[i]);  
    }
    id_ultima_tarea =  res.id[res.id.length -1];
    localStorage.setItem("id_tarea",id_ultima_tarea);
    console.log(id_ultima_tarea);
  }
}
Obtener_tareas(localStorage.getItem("id_usuario"));


btn_VM.addEventListener("click",async function  handle_submit(e) {  //Crear tarea en la ventana modal
  e.preventDefault()
  let importancia = importancia_VM.value;
  let nombre = nombre_VM.value;
  let descripcion = descripcion_VM.value;
  let id_usuario = localStorage.getItem('id_usuario');
  console.log(nombre);
  console.log(descripcion);
  console.log(importancia);
  if (importancia == "Importancia") {
    alert("Complete el campo importancia, por favor")
  }else{
    const respuesta = await fetch(`${API}/Agregar_tareas`,{
      method:["POST"],
      headers:{"Content-Type":"application/json"},
    body: JSON.stringify ({
      importancia,
      nombre,
      descripcion,
      id_usuario
    })
    })
    
    let res = await respuesta.json();
    console.log(res);
    create_task(nombre,descripcion,importancia)
  }
  
  // create_task(res.nombre,res.descripcion,res.importancia,res.fecha,res.id)
  
  
})

//cerrar sesion
let cerrar_sesion = document.getElementById("btn_CerrarSesion");
cerrar_sesion.addEventListener("click",()=>{
  localStorage.removeItem('id_usuario');
})


