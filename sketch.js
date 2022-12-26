let time = 0;
let wave = [];
let circles,freq;

let img;

function setup() {
  let A = createInput('');
  let B = createInput('');
  createCanvas(1240, 480);
  //Sliders
  circles = createSlider(1, 15, 3, 1);
  freq = createSlider(1, 10, 1, 1);

  img = loadImage('assets/equation.png')

  //Config inputs
  A.position(0, height-A.height*2);
  A.size(100);
  ainp = A.input(myInputEvent);
  B.position(0, height-A.height);
  B.size(100);
  binp = B.input(myInputEvent);
}

function myInputEvent() {
  
  console.log('you are typing: ', this.value());
}

function draw() {
  let quantity = circles.value();
  let frequency = freq.value();
  background(10);
  translate(320, 200);
  stroke(255);
  noFill();

  let x = 0;
  let y = 0;
  for (let i = 1; i < quantity; i++) {
    let prevx = x;
    let prevy = y;
    let n = TWO_PI*i;
    
    //Fourier series Equation
    let radius = (4 / (n * PI)) * 300;
    x += -radius * cos(n * time);
    y += radius * sin(n * time);

    //Draw circles
    stroke(100);
    fill(0, 30 * i, 10 * i, 100);
    ellipse(prevx, prevy, radius * 2);
    line(prevx, prevy, x, y);
  }
  wave.unshift(y);
  fill(255);
  ellipse(x, y, 4);

  translate(280, 0);
  stroke(100);
  line(x - 280, y, 0, wave[0]);
  stroke(200);

  beginShape();
  noFill();
  for (let i = 0; i < wave.length; i++) {
    vertex(i, wave[i]);
  }
  endShape();

  //time step
  time += frequency / 150;

  //wave lenght limit
  while (wave.length > 400) {
    wave.pop();
  }
  //Draw equation image
  translate(-600,-200)
  image(img, 0,0, img.width/1.5, img.height/1.5);

}
