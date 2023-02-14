let time = 0;
let wave = [];
let circles, freq;

let img;

function setup() {
  createCanvas(1240, 480);
  //Sliders
  circles = createSlider(1, 15, 3, 1);
  freq = createSlider(1, 10, 3, 1);

  img = loadImage("assets/equation.png");
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
  let sign = 1;
  let seriesType = "dente de serra down";
  for (let i = 0; i < quantity; i++) {
    if (seriesType == "dente de serra down") {
      var n = i + 1;
      sign = n % 2 === 0 ? -1 : 1;
      var radius = 100 * (4 / (n * PI));
    } else if (seriesType == "quadrada") {
      var n = i * 2 + 1;
      var radius = 100 * (4 / (n * PI)); // 4/(n*PI) se refere à constante da função quadratica
    }else if (seriesType == "dente de serra up") {
      var n = i + 1;
      sign = n % 2 === 0 ? 1 : -1;
      var radius = 100 * (4 / (n * PI));}

    let prevx = x;
    let prevy = y;
    x += sign * radius * cos(n * 2*PI*time);
    y += sign * radius * sin(n * 2*PI*time);

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
  time += frequency / 300;

  //wave lenght limit
  while (wave.length > 400) {
    wave.pop();
  }
  //Draw equation image
  translate(-600, -200);
  image(img, 0, 0, img.width / 1.5, img.height / 1.5);
}
