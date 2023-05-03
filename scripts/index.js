let API = "http://127.0.0.1:5000";
let boton = document.getElementById("boton_submit");
let usuario = document.getElementById("usuario");
let contraseña = document.getElementById("contraseña");
let mensaje = document.getElementById("mensaje");
boton.addEventListener("click",async function  handle_submit(e) {
    e.preventDefault()
    let usuario_value = usuario.value;
    let contraseña_value = contraseña.value;
    console.log(usuario_value);
    console.log(contraseña_value);

    const respuesta = await fetch(`${API}/iniciar_sesion`,{
      method:["POST"],
      headers:{"Content-Type":"application/json"
    },
    body: JSON.stringify ({
      usuario_value,
      contraseña_value
    })
    })
    
        let res = await respuesta.json();
        console.log(res);
    if (res.autenticacion) {
        window.location.href= "../templates/Dashboard.html"
    }
    else{
        mensaje.innerHTML = "Cuenta no existente"
    }
  })
  