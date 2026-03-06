const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let animation;
function clearCanvas(){
cancelAnimationFrame(animation);
ctx.clearRect(0,0,canvas.width,canvas.height);
}
function position(t,x0,y0,v0,a,angle){

let rad = angle*Math.PI/180;

let x = x0 + v0*Math.cos(rad)*t + 0.5*a*Math.cos(rad)*t*t;
let y = y0 + v0*Math.sin(rad)*t + 0.5*a*Math.sin(rad)*t*t;

return {x,y};
}
function startMotion(){

clearCanvas();

let x0 = Number(document.getElementById("x0").value);
let y0 = Number(document.getElementById("y0").value);
let angle = Number(document.getElementById("angle").value);
let v0 = Number(document.getElementById("v0").value);
let a = Number(document.getElementById("a").value);

let color = document.getElementById("color").value;

let t = 0;

ctx.beginPath();
ctx.moveTo(x0,y0);
ctx.strokeStyle=color;

function animate(){

let pos = position(t,x0,y0,v0,a,angle);

ctx.lineTo(pos.x,pos.y);
ctx.stroke();

t += 0.1;

if(pos.x<0 || pos.x>canvas.width || pos.y<0 || pos.y>canvas.height){
return;
}

animation=requestAnimationFrame(animate);

}

animate();

}
function drawGrid(){

ctx.strokeStyle="#ccc";

for(let x=0;x<canvas.width;x+=50){
ctx.beginPath();
ctx.moveTo(x,0);
ctx.lineTo(x,canvas.height);
ctx.stroke();
}

for(let y=0;y<canvas.height;y+=50){
ctx.beginPath();
ctx.moveTo(0,y);
ctx.lineTo(canvas.width,y);
ctx.stroke();
}

}
function clearCanvas(){
cancelAnimationFrame(animation);
ctx.clearRect(0,0,canvas.width,canvas.height);
drawGrid();
}