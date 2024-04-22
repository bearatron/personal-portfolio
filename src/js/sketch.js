let canvas;
let possibleSeeds = 1000;
let seed;
const mobileWidth = 425;
const sketchHolder = document.getElementById("sketch-holder");

function setup() {
  console.log(document.getElementById("sketch-holder").offsetWidth);
  console.log(document.getElementById("sketch-holder").offsetHeight);

  canvas = createCanvas(sketchHolder.offsetWidth, sketchHolder.offsetHeight);
  canvas.parent(sketchHolder);
  seed = random(1, possibleSeeds);
  console.log(`${sketchHolder.offsetWidth} x ${sketchHolder.offsetHeight}`);
}

function draw() {
  background("#ebecef");

  for (let i = 0; i < 5; i++) {
    noiseSeed(seed + i);
    let rgbs = "43, 43, 44".split(", ").map((e) => Number(e));
    let startX = windowWidth * (1 / 3);
    let maxHeight = windowHeight * 0.85;
    let mtnHeight = windowHeight * 0.14; // height of each mountain

    if (windowWidth <= mobileWidth) {
      startX = -100;
      maxHeight = windowHeight * 0.35;
      mtnHeight = windowHeight * 0.08;
    }

    mountain(
      color(rgbs[0] + 20 * i, rgbs[1] + 20 * i, rgbs[2] + 20 * i),
      startX,
      -100 / 2,
      windowWidth,
      maxHeight - mtnHeight * i,
      0.012 * pow(0.98, i), // decreasing noise detail
      100
    );
  }
}

function windowResized() {
  resizeCanvas(sketchHolder.offsetWidth, sketchHolder.offsetHeight);
  console.log(`${sketchHolder.offsetWidth} x ${sketchHolder.offsetHeight}`);
  draw();
}

// function mousePressed() {
//   seed = random(1, possibleSeeds);
// }

function mountain(
  mtnColor,
  startX,
  startY,
  endX,
  endY,
  noiseLevel,
  noiseRange
) {
  noStroke();

  // make bottom left 0, 0
  translate(0, windowHeight);
  scale(1, -1);

  fill(mtnColor);
  beginShape();

  for (let x = startX; x <= endX; x++) {
    noiseDetail(6, 0.15);

    vertex(
      x,
      mountainCurve(
        x,
        startX,
        endX - startX,
        max(startY, endY),
        abs(startY - endY),
        startY > endY
      ) + map(noise(x * noiseLevel), 0, 1, -noiseRange / 2, noiseRange / 2)
    );
  }

  vertex(endX, 0);
  vertex(startX, 0);

  endShape(CLOSE);

  // make top right 0, 0
  translate(0, windowHeight);
  scale(1, -1);
}

function mountainCurve(x, startX, mtnWidth, peak, height, leftPeak) {
  if (leftPeak) {
    if (x < startX + mtnWidth)
      return (
        peak -
        height * pow(abs(sin((PI / 2) * (1 / mtnWidth) * (x - startX))), 6.5)
      );
    return peak - height; // don't draw past the trough
  } else {
    if (x < startX + mtnWidth)
      return (
        peak -
        height *
          pow(
            abs(sin((PI / 2) * (1 / mtnWidth) * (x + mtnWidth - startX))),
            3.5
          )
      );
    return peak; // don't draw past the peak
  }
}
