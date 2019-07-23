"use strict";

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.querySelector('#canvas');
  const context = canvas.getContext('2d');

  context.fillStyle = 'red';
  context.fillRect(50, 50, 20, 20);
});
