let btn_Buscar = document.getElementById("btn_buscar");
let barra_Buscadora = document.getElementById("barra_buscadora");
let taskContainer = document.getElementById("task_container");
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
        taskContainer.className = "taskContainerNone";
    }
    })