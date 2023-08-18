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
            cont.innerHTML = `
            <br>

            <label for="usuario">Ingrese el codigo</label>
            <br>
            <br>


            <input type="text" id="inputCodigo" name="username" required>
            <br>

            <input class="btnGreen" onclick=ValidarCodigo() type="button" id="boton_submit" value="Validar">
            `

        }
        
    }
    Enviar_Mail()
})
function ValidarCodigo() {
  let code = document.getElementById("inputCodigo")
  if (code.value == codigo) {
    cont.innerHTML = `<label for="usuario">Usuario verificado con exito</label>
            <br>
            <br>


            <input type="password" id="inputNuevaContraseña" name="username" required>
            <br>

            <input class="btnGreen" onclick=CambiarContraseña() type="button" id="BtnValidarCodigo" value="Cambiar contraseña">
            `
  }else{
    cont.innerHTML = `
            <br>
            <br>
            <h4>El codigo es incrorrecto, intente de nuevo</h4>
            <br>
            <input type="text" id="inputCodigo" name="username" required>
            <br>
            <input class="btnGreen" onclick=ValidarCodigo() type="button" id="boton_submit" value="Validar">
            `
  }
}
function CambiarContraseña() {
  let nuevaContraseña = document.getElementById("inputNuevaContraseña");
  console.log(email);
}