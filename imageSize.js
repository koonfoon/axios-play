const sizeOf = require('image-size');
const Path = require('path')

const imagePath = Path.resolve(__dirname, "downloaded", "ssis071pl.jpg");

const dimensions = sizeOf(imagePath);

console.log(dimensions.width, dimensions.height);