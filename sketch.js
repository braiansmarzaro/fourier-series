let time = 0;
let wave = [];
let circles;
function setup() {
  createCanvas(1240, 480);
  circles = createSlider(1, 15, 3, 1);
  freq = createSlider(1, 10, 1, 1);
}

function draw() {
  let quantity = circles.value();
  let frequency = freq.value();
  background(0);
  translate(320,200);
  stroke(255);
  noFill();
  
  let x=0;
  let y=0;
  for(let i=0; i<quantity; i++) {
    let prevx = x;
    let prevy = y;
    let n = i*2+1;

    let radius = 4/(n*PI)*100;
    x += -radius * cos(n*time);
    y += radius * sin(n*time);
    
    stroke(100);
    fill(0,30*i,10*i,100);
    ellipse(prevx,prevy,radius*2);
    line(prevx,prevy,x,y);
  }
  wave.unshift(y);
  fill(255);
  ellipse(x, y,4)


  translate(280,0);
  stroke(100);
  line(x-280,y,0,wave[0]);
  stroke(200);

  beginShape();
  noFill();
  for (let i = 0; i < wave.length; i++) {
    vertex(i,wave[i])
  }
  endShape();
  
  time += frequency/150;

  while (wave.length > 400) {
    wave.pop();
  }
}
