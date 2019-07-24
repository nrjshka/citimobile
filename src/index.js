"use strict";

// Initialization
let carState = {
  x: 0,
  y: 0,
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
  
  if (carImage.complete) {
    context.drawImage(carImage, carState.x, carState.y);
  } else {
    carImage.onload = () => context.drawImage(carImage, carState.x, carState.y);
  }
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
      changeCarState({ x: carState.x - 1 });
    } else if (carState.x < pageX) {
      changeCarState({ x: carState.x + 1 });
    }

    if (carState.y > pageY) {
      changeCarState({ y: carState.y - 1 });
    } else if (carState.y < pageY) {
      changeCarState({ y: carState.y + 1 });
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