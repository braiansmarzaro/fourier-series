let time = 0;
let wave = [];
let circles, freq;

let img;

function setup() {
  createCanvas(screen.width, 480);

  //Sliders
  circles = document.querySelector('input#circles')
  freq = document.querySelector('input#frequency')
  img = loadImage("assets/equation.png");
}

function draw() {
  let seriesType = window.document
    .querySelector('input[name="radseries"]:checked')
    .getAttribute("id");
  console.log(seriesType);
  
  let quantity = circles.value;
  let frequency = freq.value;

  background(10);
  textSize(15);
  fill(255);
  translate(320, 200);
  stroke(255);
  noFill();

  let x = 0;
  let y = 0;
  let sign = 1;
  let n, radius;
  for (let i = 0; i < quantity; i++) {
    if (seriesType == "quadrada") {
      n = i * 2 + 1;
      radius = 80 * (4 / (n * PI)); // 4/(n*PI) se refere à constante da função quadratica
    } else if (seriesType == "serradown") {
      n = i + 1;
      sign = n % 2 === 0 ? -1 : 1;
      radius = 100 * (4 / (n * PI));
    } else if (seriesType == "serraup") {
      n = i + 1;
      sign = n % 2 === 0 ? 1 : -1;
      radius = 100 * (4 / (n * PI));
    }

    let prevx = x;
    let prevy = y;
    x += sign * radius * cos(n * 2 * PI * time);
    y += sign * radius * sin(n * 2 * PI * time);

    stroke(255, 100);
    noFill();
    ellipse(prevx, prevy, radius * 2);

    fill(255);
    stroke(255);
    line(prevx, prevy, x, y);
  }
  wave.unshift(y);

  translate(200, 0);
  line(x - 200, y, 0, wave[0]);
  beginShape();
  noFill();
  for (let i = 0; i < wave.length; i++) {
    vertex(i, wave[i]);
  }
  endShape();

  //time step
  time += frequency / 360;

  //wave lenght limit
  while (wave.length > 500) {
    wave.pop();
  }
  //Draw equation image
  translate(-600, -200);
  //image(img, 0, 0, img.width / 1.5, img.height / 1.5);
}
