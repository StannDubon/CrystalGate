// Obtiene el modal
var modal = document.getElementById("myModal");

// Obtiene el botón que abre el modal
var btn = document.getElementById("info");

// Obtiene el elemento <span> que cierra el modal
var span = document.getElementsByClassName("close-button")[0];

// Cuando el usuario hace clic en el botón, abre el modal
btn.onclick = function() {
  modal.style.display = "block";
}

// Cuando el usuario hace clic en <span> (x), cierra el modal
span.onclick = function() {
  modal.style.display = "none";
}

// Cuando el usuario hace clic fuera del modal, se cierra
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}