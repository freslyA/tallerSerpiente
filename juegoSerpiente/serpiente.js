
// 1. Capturamos el canvas y su contexto de dibujo
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");
const TAMAÑO_CELDA = 25
let comidaX = generarAleatorio(0,canvas.width-TAMAÑO_CELDA,TAMAÑO_CELDA)
let comidaY = generarAleatorio(0,canvas.height-TAMAÑO_CELDA,TAMAÑO_CELDA)
let puntaje=0
let velocidad=500
let serpiente=[
  {x:5,y:5},
  {x:4,y:5},
  {x:3,y:5}
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
  let puntajeTxt=document.getElementById("puntaje")
  puntajeTxt.innerText=puntaje
  limpiarCanvas();
  dibujarTablero();
  pintarSerpiente()
  pintarComida()
  gameOver()
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
  if(atraparComida()==false){
    serpiente.pop()
  }
}
function moverIzquierda(){
  let elemento=serpiente[0]
  let movimiento={x:elemento.x-1,y:elemento.y}
  serpiente.unshift(movimiento)
   if(atraparComida()==false){
    serpiente.pop()
  }
}
function moverArriba(){
  let elemento=serpiente[0]
  let movimiento={x:elemento.x,y:elemento.y-1}
  serpiente.unshift(movimiento)
   if(atraparComida()==false){
    serpiente.pop()
  }
}
function moverAbajo(){
  let elemento=serpiente[0]
  let movimiento={x:elemento.x,y:elemento.y+1}
  serpiente.unshift(movimiento)
  if(atraparComida()==false){
    serpiente.pop()
  }
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
  intervaloSerpiente=setInterval(moverSerpiente,velocidad)
  cambiarVelocidad()
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
function pintarComida(){
  ctx.fillStyle="red"
  ctx.fillRect(comidaX,comidaY,TAMAÑO_CELDA,TAMAÑO_CELDA)
}
function generarAleatorio(min, max, salto){
  let numeros = []
  for(let i = min; i <= max; i += salto){
    numeros.push(i)
  }
  let posicion = Math.floor(Math.random() * numeros.length)
  return numeros[posicion]
}
function atraparComida(){
  let cabeza = serpiente[0]
  let cabezaX = cabeza.x * TAMAÑO_CELDA
  let cabezaY = cabeza.y * TAMAÑO_CELDA
  if(cabezaX == comidaX && cabezaY == comidaY){
    puntaje+=1
    comidaX = generarAleatorio(
      0,
      canvas.width - TAMAÑO_CELDA,
      TAMAÑO_CELDA
    )
    comidaY = generarAleatorio(
      0,
      canvas.height - TAMAÑO_CELDA,
      TAMAÑO_CELDA
    )
    return true
  }
  return false
}
function gameOver(){
  let cabeza = serpiente[0]
  let x = cabeza.x * TAMAÑO_CELDA
  let y = cabeza.y * TAMAÑO_CELDA
  // choque con paredes
  if(
    x >= canvas.width ||
    cabeza.x < 0 ||
    y >= canvas.height ||
    cabeza.y < 0
  ){
    alert("GAME OVER")
    clearInterval(intervaloSerpiente)
  }
  // choque consigo misma
  for(let i = 1; i < serpiente.length; i++){
    let parte = serpiente[i]
    if(cabeza.x == parte.x && cabeza.y == parte.y){
      alert("GAME OVER")
      clearInterval(intervaloSerpiente)
    }
  }

}
function reiniciarJuego(){
  // detener juego anterior
  clearInterval(intervaloSerpiente)
  // reiniciar velocidad
  velocidad = 500
  // reiniciar dirección
  direccionActual = "derecha"
  // reiniciar puntaje
  puntaje = 0
  // reiniciar serpiente
  serpiente.length = 0
  serpiente.push(
    {x:5,y:5},
    {x:4,y:5},
    {x:3,y:5}
  )
  // nueva comida
  comidaX = generarAleatorio(
    0,
    canvas.width - TAMAÑO_CELDA,
    TAMAÑO_CELDA
  )
  comidaY = generarAleatorio(
    0,
    canvas.height - TAMAÑO_CELDA,
    TAMAÑO_CELDA
  )
  // limpiar y pintar
  limpiarCanvas()
  dibujarTodo()
  // iniciar nuevamente
  intervaloSerpiente = setInterval(
    moverSerpiente,
    velocidad
  )
}
function cambiarVelocidad(){
  if(puntaje==5){
    velocidad=300
  }
  else if(puntaje==7){
    velocidad==150
  }
}