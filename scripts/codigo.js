let API = "http://127.0.0.1:5000";

let h3_enviadoA = document.getElementById("enviado_a");
h3_enviadoA.innerHTML="El codigo fue enviado a " + localStorage.getItem("usuarioAgregar");
let numeroConfirmacion = Math.floor(Math.random() * 90000) + 10000;
let verificar = document.getElementById("Verificar");
let codigo = document.getElementById("codigo");
let usuario_value = localStorage.getItem("usuarioAgregar");
let contraseña_value = localStorage.getItem("contraseñaAgregar");
let h4_creado = document.getElementById("h4_creacion");
async function Enviar_Mail(){
    const respuesta = await fetch(`${API}/Enviar_mail`,{
        mode:'cors',
          method:["POST"],
          headers:{"Content-Type":"application/json"
        },
        body: JSON.stringify ({
          usuario_value,
          numeroConfirmacion

        })
        })
    res = respuesta.json();
}
Enviar_Mail()
verificar.addEventListener("click", async ()=>{
if (numeroConfirmacion == codigo.value ) {
    console.log("coincide")
    let usuario_value = localStorage.getItem("usuarioAgregar");
    let contraseña_value = localStorage.getItem("contraseñaAgreagar");
    const respuesta = await fetch(`${API}/crear_cuenta`,{
    mode:'cors',
      method:["POST"],
      headers:{"Content-Type":"application/json"
    },
    body: JSON.stringify ({
      usuario_value,
      contraseña_value,
    })
    })
    
        let res = await respuesta.json();
        console.log(res);
        if (res.creacion) {
            h4_creado.innerHTML="Usuario creado con exito",
            setTimeout(()=>{
                window.location.href = "../index.html"
            },4000)
        }
   
    
    }
})