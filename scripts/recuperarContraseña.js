let API = "http://127.0.0.1:5000";

let mailInput = document.getElementById("usuario");
let btnSubmit = document.getElementById("boton_submit");
let cont = document.getElementById("contRecuperar");

btnSubmit.addEventListener("click",(e)=>{
    e.preventDefault
    let mail = mailInput.value;
    let codigo = Math.floor(Math.random() * 90000) + 10000;
    async function Enviar_Mail(){
        const respuesta = await fetch(`${API}/Enviar_mail`,{
            mode:'cors',
              method:["POST"],
              headers:{"Content-Type":"application/json"
            },
            body: JSON.stringify ({
              usuario_value:mail,
              numeroConfirmacion:codigo
    
            })
            })
        res = await respuesta.json();
        console.log(res);
        if (res.exito == true) {
            cont.innerHTML = `<label for="usuario">Ingrese el codigo</label>
            <br>

            <input type="text" id="inputCodigo" name="username" required>
            <br>

            <input type="button" id="boton_submit" value="Validar">
            `

        }
        
    }
    Enviar_Mail()
})
