const sizeOf = require('image-size');
const Path = require('path')
const sharp = require('sharp');

const imagePath = Path.resolve(__dirname, "downloaded", "ssis088pl.jpg");

const dimensions = sizeOf(imagePath);

console.log(dimensions.width, dimensions.height);

// Cropping size on the image to poster ratio
const sizeToCrop = {
  width: 378,
  height: 538,
  left: 422,
  top: 0
};

const croppedFileNamePath = Path.resolve(__dirname, "downloaded", "poster.jpg");

sharp(imagePath).extract(sizeToCrop).toFile(croppedFileNamePath)
  .then(function(new_file_info){
    console.log("Image cropped and saved");
  })
  .catch(function(error) {
    console.log("An error occured");
  })
