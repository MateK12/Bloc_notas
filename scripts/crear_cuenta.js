let API = "http://127.0.0.1:5000";
let boton = document.getElementById("boton_submit");
let usuario = document.getElementById("usuario");
let contraseña = document.getElementById("Contraseña");


boton.addEventListener("click",async function  handle_submit(e) {
    e.preventDefault()
    let usuario_value = usuario.value;
    let contraseña_value = contraseña.value;
    console.log(usuario_value);
    const respuesta = await fetch(`${API}/crear_cuenta`,{
      method:["POST"],
      headers:{"Content-Type":"application/json"
    },
    body: JSON.stringify ({
      usuario_value,
      contraseña_value
    })
    })
    
    setTimeout(()=>{
        let res =  respuesta;
        console.log(respuesta.json());
    
    },1000)
  })
  