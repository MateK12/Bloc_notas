let API = "http://127.0.0.1:5000";


let tareas = []
let ordenar_Select = document.getElementById("ordenar_por");
let task_container = document.getElementById("task_container");
let boton_add = document.getElementById("btn_add");
let loaderCont = document.getElementById("loaderCont");
function create_task(titulo,descripcion ,importancia,fecha = "ahora",id=localStorage.getItem("id_usuario")+1) {
  
    let container = document.createElement("div");
    container.innerHTML = `
    <br>
    <div>
    <div class="card" style="width: 20 rem;">
    <div class="card-body">
      <h2 class="card-title">${titulo}</h2>
      <p class="card-text">${descripcion}</p>
   
      <span>
      
      <h3 class="card-subtitle mb-2 text-body-secondary"  id="importanciaTemplate">${importancia}</h3>
      <img id="estrella" src="../assets/estrella.png" alt="">
      </span>
      <br>
      <br><br>
      <h4 class="card-subtitle mb-2 text-body-secondary">${fecha}</h4>
      <h6 id="h6_id" class="card-subtitle mb-2 text-body-secondary">${id}</h6>
      <button onclick=Editar_Tarea_Redireccion(${id}) id="abrirModalEditar" type="button" class="btn btn-info"><img src="../assets/editar.png" alt="">
      </button>
      <button class="btn btn-danger" onclick=btn_borrar(${id}) id="btnModal"><img src="../assets/eliminar.png" alt="">
      </button> 
      </div>
  </div>
  </div> <br>`
  container.className = "col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12";  
  task_container.appendChild(container);
  
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
  for (let i = 0; i < res.fecha.length; i++) {
    res.fecha[i].split();
    
  }
  localStorage.setItem("tareas",res);
  if (res.creacion) {
    for (let i = 0; i < res.nombre.length; i++) {
    let formatearFecha = res.fecha[i].slice(5,16);
    console.log(formatearFecha)
    let obj_tarea = {
        titulo:res.nombre[i],
        descripcion:res.descripcion[i],
        importancia:res.importancia[i],
        fecha:formatearFecha,
        id:res.id[i]
      }
    tareas.push(obj_tarea)
    create_task(res.nombre[i],res.descripcion[i],res.importancia[i],formatearFecha,res.id[i]);  
    }
    console.log(res.fecha)
    id_ultima_tarea =  res.id[res.id.length -1];
    localStorage.setItem("id_tarea",id_ultima_tarea);
    console.log(id_ultima_tarea);
  }
}
setTimeout(()=>{
  Obtener_tareas(localStorage.getItem("id_usuario"));
},1000)


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
    setTimeout(()=>{
      loaderCont.innerHTML = `<div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>`;
      setTimeout(()=>{
        window.location.reload();
      },1000)
      },500)
  }
  
  // create_task(res.nombre,res.descripcion,res.importancia,res.fecha,res.id)
}) 
ordenar_Select.addEventListener("change",()=>{
  console.log(ordenar_Select.value)
  if (ordenar_Select.value=="1") {
    Ordenar_nombre();
  }else if (ordenar_Select.value=="2") {
    Ordenar_Importancia();
  }else{
    window.location.reload()
  }
  })
  
function Ordenar_nombre() {
  task_container.innerHTML = " ";
  tareas.sort(function (a, b) {
    if (a.titulo > b.titulo) {
      return 1;
    }
    if (a.titulo < b.titulo) {
      return -1;
    }
    return 0;
  }); 
  for (let i = 0; i < tareas.length; i++) {
    create_task(tareas[i].titulo,tareas[i].descripcion ,tareas[i].importancia,tareas[i].fecha,tareas[i].id)
    
      }
}
function Ordenar_Importancia() {
  task_container.innerHTML = " ";
  tareas.sort(function(a, b) {
    return b.importancia - a.importancia;
  });
  for (let i = 0; i < tareas.length; i++) {
    create_task(tareas[i].titulo,tareas[i].descripcion ,tareas[i].importancia,tareas[i].fecha,tareas[i].id)
    
      }
}




//cerrar sesion
let cerrar_sesion = document.getElementById("btn_CerrarSesion");
cerrar_sesion.addEventListener("click",()=>{
  localStorage.removeItem('id_usuario');
})


