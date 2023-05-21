// Ventana modal
var modal = document.getElementById("ventanaModal");

// Botón que abre el modal
var boton = document.getElementById("abrirModal");

// Hace referencia al elemento <span> que tiene la X que cierra la ventana
var span = document.getElementsByClassName("cerrar")[0];

// Cuando el usuario hace click en el botón, se abre la ventana
boton.addEventListener("click",function() {
  modal.style.display = "block";
});

// Si el usuario hace click en la x, la ventana se cierra
span.addEventListener("click",function() {
  modal.style.display = "none";
});




//DDDDDDDDDDDDD
let importancia_VM = document.getElementById("importancia_VM");
let nombre_VM = document.getElementById("nombre_VM");
let descripcion_VM = document.getElementById("descripcion_VM");
let btn_VM = document.getElementById("btn_VM");