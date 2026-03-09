const width = 600;
const height = 400;

const svg = d3
.select("#chart")
.append("svg")
.attr("width", width)
.attr("height", height);

let xScale = d3.scaleLinear()
.domain([0,600])
.range([0,width]);

let yScale = d3.scaleLinear()
.domain([0,400])
.range([height,0]);

svg.append("g")
.attr("transform","translate(0,"+height+")")
.call(d3.axisBottom(xScale));

svg.append("g")
.call(d3.axisLeft(yScale));

function getPosition(t,x0,y0,v0,angle){

let g = 9.8;

let rad = angle*Math.PI/180;

let x = x0 + v0*Math.cos(rad)*t;
let y = y0 + v0*Math.sin(rad)*t - 0.5*g*t*t;

return {x,y};

}

function generateData(x0,y0,v0,a,angle){

let data=[];

for(let t=0;t<10;t+=0.1){

let pos=getPosition(t,x0,y0,v0,a,angle);

data.push({
x:pos.x,
y:pos.y
});

}

return data;

}

function drawTrajectory(){

svg.selectAll("path").remove();

let x0 = Number(document.getElementById("x0").value);
let y0 = Number(document.getElementById("y0").value);
let angle = Number(document.getElementById("angle").value);
let v0 = Number(document.getElementById("v0").value);
let a = Number(document.getElementById("a").value);

let color = document.getElementById("color").value;

let data = generateData(x0,y0,v0,a,angle);

let line = d3.line()
.x(d => xScale(d.x))
.y(d => yScale(d.y));

svg.append("path")
.datum(data)
.attr("fill","none")
.attr("stroke",color)
.attr("stroke-width",2)
.attr("d",line);

}