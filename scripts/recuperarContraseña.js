let API = "http://127.0.0.1:5000";

let mailInput = document.getElementById("usuario");
let btnSubmit = document.getElementById("boton_submit");
let cont = document.getElementById("contRecuperar");
let codigo = Math.floor(Math.random() * 90000) + 10000;
let email;

btnSubmit.addEventListener("click",(e)=>{
    e.preventDefault
    email = mailInput.value;
    async function Enviar_Mail(){
        const respuesta = await fetch(`${API}/Enviar_mail`,{
            mode:'cors',
              method:["POST"],
              headers:{"Content-Type":"application/json"
            },
            body: JSON.stringify ({
              usuario_value:email,
              numeroConfirmacion:codigo
    
            })
            })
        res = await respuesta.json();
        console.log(res);
        if (res.exito == true) {
          let loaderCont = document.getElementById("loaderCont");
        loaderCont.innerHTML = `<div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>`
        setTimeout(() => {
          loaderCont.innerHTML = ` `
          cont.innerHTML = `
          <br>
          <div style="justify-content: center; align-items: center; text-align: center; height: fit;">
                    <img src="../assets/Icono.png" alt="">
                </div>
          <h3 for="usuario">Ingrese el codigo</h3>
          <br>
          <div id="loaderCont" class="loader">
          </div>
         <br>

          <label for="inputCodigo">El codigo fue enviado a: ${email}</label>
          <br>
          <br>



          <input type="text" id="inputCodigo" name="username" required>
          <br>

          <input class="btnGreen" onclick=ValidarCodigo() type="button" id="boton_submit" value="Validar">
          `
        }, 3000);
         

        }
        
    }
    Enviar_Mail()
})
function ValidarCodigo() {
  let code = document.getElementById("inputCodigo");
  let loaderCont = document.getElementById("loaderCont");
  loaderCont.innerHTML = `<div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>`
  if (code.value == codigo) {
    setTimeout(() => {
      loaderCont.innerHTML = ` `
      cont.innerHTML = `
      <div style="justify-content: center; align-items: center; text-align: center; height: fit;">
                    <img src="../assets/Icono.png" alt="">
                </div>
      <h3 for="usuario">Usuario verificado con exito</h3>
      <br>
      <br>
      <label for="">
      Ingrese su nueva contraseña
      </label>
      <br>
      <br>
      <div id="loaderCont" class="loader">
      </div>
      <input type="password" id="inputNuevaContraseña" name="username" placeholder="" required>
      <br>

      <input class="btnGreen" onclick=CambiarContraseña() type="button" id="BtnValidarCodigo" value="Cambiar contraseña">
      `
    }, 3000);

  }else{
    
    setTimeout(() => {
      cont.innerHTML = `
            <br>
            <br>
            <div style="justify-content: center; align-items: center; text-align: center; height: fit;">
                    <img src="../assets/Icono.png" alt="">
                </div>
            <h4>El codigo es incrorrecto, intente de nuevo</h4>
            <br>

            <div id="loaderCont" class="loader">
            </div>
            <br>
            <input type="text" id="inputCodigo" name="username" required>
            <br>
            <input class="btnGreen" onclick=ValidarCodigo() type="button" id="boton_submit" value="Validar">
            `
    }, 2000);
    
  }
}
async function CambiarContraseña() {
  let nuevaContraseña = document.getElementById("inputNuevaContraseña");
  const cambiarContraseña = await fetch(`${API}/CambiarContraseña`,{
    mode:'cors',
      method:["POST"],
      headers:{"Content-Type":"application/json"
    },
    body: JSON.stringify ({
      mail:email,
      nuevaContraseña:nuevaContraseña.value

    })
    })
res = await cambiarContraseña.json();
if (res.exito) {
  let loaderCont = document.getElementById("loaderCont");
      loaderCont.innerHTML = `<div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>`
  cont.innerHTML = `

  <br>
  <div style="justify-content: center; align-items: center; text-align: center; height: fit;">
                    <img src="../assets/Icono.png" alt="">
                </div>
  <h4>Contraseña cambiada con exito</h4>
  <br>
  
  <div id="loaderCont" class="loader">
  <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
  </div>
  <br>
  <label for="">Redirigiendo...</label>

  `
  
  setTimeout(()=>{
    window.location.href = "../../index.html"
  },5000)      
}

}