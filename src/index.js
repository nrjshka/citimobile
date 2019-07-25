"use strict";

// Initialization
let carState = {
  x: 150,
  y: 150,
  w: 80,
  h: 40,
  angle: 0,
  isMoving: false,
  getCurrentAngle: function() {
    return this.angle * Math.PI/180;
  }
}

const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');

const carImage = new Image();
carImage.src = 'img/car.png';

canvas.width = window.innerWidth; canvas.height = window.innerHeight;

// First Draw
drawView();

canvas.onclick = mapOnClick;
canvas.ontouched = mapOnClick;

window.onresize = () => {
  canvas.width = window.innerWidth; canvas.height = window.innerHeight;

  drawView();
}

// Logic Function
function drawView() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.save();

  if (carImage.complete) {
    drawCar();
  } else {
    carImage.onload = drawCar;
  }
}

function drawCar() {
  context.translate(carState.x, carState.y);
  context.rotate(carState.getCurrentAngle());

  context.drawImage(carImage, -(carState.w / 2), -(carState.h / 2));

  context.restore();
}

function moveCar({ pageX, pageY }) {
  return function amation() {
    if (!carState.isMoving || (
      (pageX + 5 > carState.x && pageX - 5 < carState.x) && (pageY + 5 > carState.y && pageY - 5 < carState.y)
    ) ) {
      changeCarState({ isMoving: false, x: pageX, y: pageY });
    } else {
      drawView();
      requestAnimationFrame(moveCar({ pageX, pageY }));
    }

    animate({
      duration: 50000,
      timing: [makeEaseInOut(quad), makeEaseInOut(bounce)],
      draw: (pr1, pr2) => {
        const [dy, dx] = [carState.y + (pageY - carState.y) * pr1 - carState.y, carState.x + (pageX - carState.x) * pr2 - carState.x];
        let theta = Math.atan(dy/dx)

        theta *= 180/Math.PI;

        if (dx < 0) {
          theta += 180;
        }

        changeCarState({
          y: carState.y + (pageY - carState.y) * pr1,
          x: carState.x + (pageX - carState.x) * pr2,
          angle: theta,
        });
      }
    });
  }
}

function mapOnClick(e) {
  if (!carState.isMoving) {
    changeCarState({ isMoving: true });

    requestAnimationFrame(moveCar(e));
  }
}

// State controllers
function changeCarState(newState) {
  carState = {
    ...carState,
    ...newState
  };
}

// helper func

function bounce(timeFraction) {
  for (var a = 0, b = 1, result; 1; a += b, b /= 2) {
    if (timeFraction >= (7 - 4 * a) / 11) {
      return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
    }
  }
}

function quad(progress) {
  return Math.pow(progress, 2)
}

function makeEaseInOut(timing) {
  return function(timeFraction) {
    if (timeFraction < .5)
      return timing(2 * timeFraction) / 2;
    else
      return (2 - timing(2 * (1 - timeFraction))) / 2;
  }
}

function animate(options) {

  var start = performance.now();

  requestAnimationFrame(function animate(time) {
    if (carState.isMoving) {
      var timeFraction = (time - start) / options.duration;
      if (timeFraction > 1) timeFraction = 1;

      options.draw(...options.timing.map(func => func(timeFraction)));

      if (timeFraction < 1) {
        requestAnimationFrame(animate);
      }
    }
  });
}
