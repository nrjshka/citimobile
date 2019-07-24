"use strict";

// Initialization
let carState = {
  x: 0,
  y: 0,
  angle: 20,
  speed: 1,
  isMoving: false,
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
  
  context.rotate(carState.angle * Math.PI/180);
  context.translate(carImage.x,carImage.y);

  if (carImage.complete) {
    drawCar();
  } else {
    carImage.onload = drawCar;
  }

  context.restore();
}

function drawCar() {
  context.drawImage(carImage, carState.x, carState.y);
}

function moveCar({ pageX, pageY }) {
  return function moveAnimation() {
    if (pageX !== carState.x || pageY !== carState.y) {
      drawView();
      requestAnimationFrame(moveCar({ pageX, pageY }));
    } else {
      changeCarState({ isMoving: false });
    }

    if (carState.x > pageX) {
      changeCarState({ x: carState.x + carState.speed * Math.cos(Math.PI/180 * carState.angle) });
    } else if (carState.x < pageX) {
      changeCarState({ x: carState.x - carState.speed * Math.cos(Math.PI/180 * carState.angle) });
    }

    if (carState.y > pageY) {
      changeCarState({ y: carState.y + carState.speed * Math.sin(Math.PI/180 * carState.angle) });
    } else if (carState.y < pageY) {
      changeCarState({ y: carState.y - carState.speed * Math.sin(Math.PI/180 * carState.angle) });
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