"use strict";

const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth; canvas.height = window.innerHeight;

const getCarView = () => {
  let carImage = new Image();
  carImage.src = 'img/car.png';
  carImage.onload = () => {
    context.drawImage(carImage, 0, 0);
  }
};


getCarView();