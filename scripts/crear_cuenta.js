let API = "http://127.0.0.1:5000";
let boton = document.getElementById("boton_submit");
let usuario = document.getElementById("usuario");
let contrasena = document.getElementById("contrasena");
let mensaje = document.getElementById("mensaje");
let formulario = document.getElementById("formulario");
boton.addEventListener("click",async function  handle_submit(e) {
   e.preventDefault()
   let usuario_value = usuario.value;
   
   const UsuarioExiste = await fetch(`${API}/ExisteCuenta`,{
      method:["POST"],
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        usuario_value,
        })
    })
    let res = await UsuarioExiste.json();
    console.log(res)
    if (res.existencia) {
      mensaje.innerHTML = "La cuenta ya existe"
      setTimeout(()=>{
        window.location.href = "../index.html"
      },5000)
    }if (res.existencia == false) {
      usuario_value = usuario.value;
      let contraseña_value = contrasena.value;
      localStorage.setItem("usuarioAgregar",usuario_value);
      localStorage.setItem("contraseñaAgreagar",contraseña_value);
      console.log(usuario_value);
      window.location.href="../templates/confirmacion.html"
    }
    
  })
  