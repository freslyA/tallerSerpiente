
// 1. Capturamos el canvas y su contexto de dibujo
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");
const TAMAÑO_CELDA = 25
const serpiente=[
  {x:5,y:5},
  {x:10,y:10},
  {x:8,y:0}
]
let intervaloSerpiente
let direccionActual="derecha"

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
  pintarSerpiente()
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
function pintarSerpiente(){
  pintarParte()
  for(i=0;i<serpiente.length;i++){
    elemento=serpiente[i]
    x=elemento.x
    y=elemento.y
    if(i==0){
      ctx.fillStyle="yellow"
      ctx.fillRect(x*TAMAÑO_CELDA,y*TAMAÑO_CELDA,TAMAÑO_CELDA,TAMAÑO_CELDA)
      ctx.strokeStyle="white"
      ctx.strokeRect(x*TAMAÑO_CELDA,y*TAMAÑO_CELDA,TAMAÑO_CELDA,TAMAÑO_CELDA)
    }
    else if(i>0){
      pintarParte(x,y)
    }
  }
}
function moverDerecha(){
  let elemento=serpiente[0]
  let movimiento={x:elemento.x+1,y:elemento.y}
  serpiente.unshift(movimiento)
  serpiente.pop()
}
function moverIzquierda(){
  let elemento=serpiente[0]
  let movimiento={x:elemento.x-1,y:elemento.y}
  serpiente.unshift(movimiento)
  serpiente.pop()
}
function moverArriba(){
  let elemento=serpiente[0]
  let movimiento={x:elemento.x,y:elemento.y-1}
  serpiente.unshift(movimiento)
  serpiente.pop()
}
function moverAbajo(){
  let elemento=serpiente[0]
  let movimiento={x:elemento.x,y:elemento.y+1}
  serpiente.unshift(movimiento)
  serpiente.pop()
}
function cambiarDireccion(direcion){
  if(direcion=="derecha"){
    direccionActual="derecha"
  }
  else if(direcion=="izquierda"){
    direccionActual="izquierda"
  }
  else if(direcion=="abajo"){
    direccionActual="abajo"
  }
  else if(direcion=="arriba"){
    direccionActual="arriba"
  }
}
function iniciarJuego(){
  intervaloSerpiente=setInterval(moverSerpiente,1000)
}
function pausarJuego(){
  clearInterval(intervaloSerpiente)
}
function moverSerpiente(){
 if(direccionActual=="derecha"){
    moverDerecha()
    dibujarTodo()
  }
  else if(direccionActual=="izquierda"){
    moverIzquierda()
    dibujarTodo()
  }
  else if(direccionActual=="abajo"){
    moverAbajo()
    dibujarTodo()
  }
  else if(direccionActual=="arriba"){
    moverArriba()
    dibujarTodo()
  }
}