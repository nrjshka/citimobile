"use strict";

// Initialization
let carState = {
  x: 150,
  y: 150,
  w: 80,
  h: 40,
  angle: 0,
  speed: 1,
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
  return function moveAnimation() {
    if (pageX !== carState.x || pageY !== carState.y) {
      drawView();
      requestAnimationFrame(moveCar({ pageX, pageY }));
    } else {
      changeCarState({ isMoving: false });
    }

    if (carState.x > pageX || carState.x < pageX) {
      changeCarState({ x: carState.x + carState.speed * Math.cos(carState.getCurrentAngle()) });
    }

    if (carState.y > pageY || carState.y < pageY) {
      debugger;
      changeCarState({ y: carState.y - carState.speed * Math.sin(carState.getCurrentAngle()) });
    }
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