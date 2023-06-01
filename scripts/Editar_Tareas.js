let btn_editar = document.getElementById("btn_editar");
let titulo = document.getElementById("titulo");
let importancia = document.getElementById("Importancia");
let descripcion = document.getElementById("descripcion");

//Obtener tarea a editar de la DB
async function Editar_Tarea_Redireccion(id) {
    let API = "http://127.0.0.1:5000";
    let respuesta = await fetch(`${API}/Traer_Tarea`,{
        method:["POST"],
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify ({
            id,
        })  
    })
    let res = await respuesta.json();
    console.log(res);
    setTimeout(()=>{
        titulo.innerHTML = res.nombre;  
        descripcion.innerHTML = res.descripcion;
    },2000);
        }
Editar_Tarea_Redireccion(localStorage.getItem("tarea_editandose"));


//Editar la tarea

async function Editar_Tarea(id) {
    let API = "http://127.0.0.1:5000";
    let titulo_post = titulo.value;
    let descripcion_post = descripcion.value;
    let importancia_post = importancia.value
    let respuesta = await fetch(`${API}/Editar_Tarea`,{
        method:["POST"],
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify ({
            id,
            titulo_post,
            descripcion_post,
            importancia_post
        })  
    })
    let res = await respuesta.json();
    console.log(res);
    titulo.innerHTML = res.nombre;  
    descripcion.innerHTML = res.descripcion;
        }
btn_editar.addEventListener("click",Editar_Tarea(localStorage.getItem("tarea_editandose")));
