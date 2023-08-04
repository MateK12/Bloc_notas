let btn_Buscar = document.getElementById("btn_buscar");
let barra_Buscadora = document.getElementById("barra_buscadora");
let taskContainer = document.getElementById("task_container");
function Volver() {
  window.location.reload()
}
btn_Buscar.addEventListener("click", async()=>{
    let nombre = barra_Buscadora.value;
    const respuesta = await fetch(`${API}/TraerTareaPorNombre`,{
        method:["POST"],
        headers:{"Content-Type":"application/json"},
      body: JSON.stringify ({
        nombre
      })
      
    })
    let res = await respuesta.json();
    console.log(res);
    if (res.existencia) {
        taskContainer.innerHTML = ` `;
        taskContainer.innerHTML = `
        <br>
        <div id = "TareaEncontrada">
        <div class="card" style="width: 10 rem;">
        <div class="card-body">
          <h2 class="card-title">${res.nombre}</h2>
          <p class="card-text">${res.descripcion}</p>
       
          <span>
          
          <h3 class="card-subtitle mb-2 text-body-secondary"  id="importanciaTemplate">${res.importancia}</h3>
          <img id="estrella" src="../assets/estrella.png" alt="">
          </span>
          <br>
          <br><br>
          <h4 class="card-subtitle mb-2 text-body-secondary">${res.fecha}</h4>
          <button onclick=Editar_Tarea_Redireccion(${res.id}) id="abrirModalEditar" type="button" class="btn btn-info"><img src="../assets/editar.png" alt="">
          </button>
          <button class="btn btn-danger" onclick=btn_borrar(${res.id}) id="btn-eliminar"><img src="../assets/eliminar.png" alt="">
          </button> 
          <button class="btn btn-secondary" onclick=Volver() ><img src="../assets/atras.png" alt="">
          </button> 
          </div>
      </div>
      <br>
      <br>

      </div>`
    }else{
      taskContainer.innerHTML = `<div class="alert alert-warning text-center" role="alert">
No se encontro ninguna tarea con ese nombre    </div>`
    }

    })