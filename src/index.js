"use strict";

let x = 0, y = 0, isMoving = false;
const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');

const carImage = new Image();
carImage.src = 'img/car.png';

canvas.width = window.innerWidth; canvas.height = window.innerHeight;

context.drawImage(carImage, 0, 0);