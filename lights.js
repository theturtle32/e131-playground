let { flush, pixels } = require('./e131output')();
let FlickerPixel = require('./flickerpixel');

let flickerPixels = [];
let currentPixel = 0;
function run() {
  
  flickerPixels[currentPixel] = new FlickerPixel();
  currentPixel = (currentPixel + 1) % pixels.length;
  
  for (let i = 0; i < pixels.length; i ++) {
    let flickerPixel = flickerPixels[i];
    if (flickerPixel) {
      flickerPixel.update();
      pixels[i] = flickerPixel.output;
    }
  }
  
  flush();
}
setInterval(run, 25);
