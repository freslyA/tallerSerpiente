
// 1. Capturamos el canvas y su contexto de dibujo
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");
const TAMAÑO_CELDA = 25



// Primera pintura del juego al cargar la página
dibujarTodo();

// =========================
// FUNCIONES DE DIBUJO
// =========================

function limpiarCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function dibujarTodo() {
  limpiarCanvas();
  dibujarTablero();
  pintarParte(5,5)
}
function dibujarTablero(){ 
for (i = 0; i < canvas.width; i += TAMAÑO_CELDA) {
  ctx.strokeStyle = "red"
  ctx.beginPath()
  ctx.moveTo(0, i)
  ctx.lineTo(canvas.width,i)
  ctx.stroke()
}
for (i = 0; i < canvas.height; i += TAMAÑO_CELDA) {
  ctx.strokeStyle = "red"
  ctx.beginPath()
  ctx.moveTo(i, 0)
  ctx.lineTo(i,canvas.height)
  ctx.stroke()
}
}
function pintarParte(lineaX,lineaY){
  ctx.fillStyle="blue"
  ctx.fillRect(lineaX*TAMAÑO_CELDA,lineaY*TAMAÑO_CELDA,TAMAÑO_CELDA,TAMAÑO_CELDA)
  ctx.strokeStyle="white"
  ctx.strokeRect(lineaX*TAMAÑO_CELDA,lineaY*TAMAÑO_CELDA,TAMAÑO_CELDA,TAMAÑO_CELDA)
}


