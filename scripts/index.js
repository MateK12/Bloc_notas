let API = "http://127.0.0.1:5000";
let boton = document.getElementById("boton_submit");
let usuario = document.getElementById("usuario");
let contraseña = document.getElementById("contraseña");
let mensaje = document.getElementById("mensaje");
boton.addEventListener("click",async function  handle_submit(e) {
    mensaje.innerHTML = ` `
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
      localStorage.setItem('id_usuario',res.user_id);
      let loaderCont = document.getElementById("loaderCont");
      loaderCont.innerHTML = `<div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>`
      setTimeout(()=>{
        window.location.href= "../templates/Dashboard.html"
       
      },5000);
    }if(res.existencia == false){
      let loaderCont = document.getElementById("loaderCont");
      loaderCont.innerHTML = `<div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>`
      setTimeout(()=>{
        mensaje.innerHTML = "La cuenta no existe";
        loaderCont.innerHTML = ` `
      },5000)
     
    }if (res.autenticacion == false) {
      let loaderCont = document.getElementById("loaderCont");
      loaderCont.innerHTML = `<div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>`
      setTimeout(()=>{
        loaderCont.innerHTML = ` `
        mensaje.innerHTML = "Error en las credenciales";      
  
      },5000);
    }
   
  })
