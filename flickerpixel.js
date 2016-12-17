class FlickerPixel {
  constructor(brightness=1, color=0x007777FF, decayRate=0.01) {
    this.brightness = brightness;
    this.color = color;
    this.decayRate = decayRate;
    this.decayRate += Math.random() * 0.006 - 0.003;
    this.running = true;
    this.outputValue = 0x0;
    this.update();
  }
  
  update() {
    if (!this.running) {
      return;
    }
    
    if (Math.random() > 0.99) {
      this.brightness = 1;
      this.decayRate = 0.06;
      // this.color = 0x00FFFFFF;
    }
    
    this.output = this.calculateOutput();
    
    this.brightness = Math.max(0, this.brightness - this.decayRate);
    
    if (this.brightness === 0) {
      this.output = [0,0,0];
      this.running = false;
    }
    else {
      this.calculateOutput();
    }
  }
  
  calculateOutput() {
    // var flickerValue = Math.random() * 64;
    return this.colorParts.map(i => Math.round(Math.min(255, i * this.brightness)));
  }
  
  get colorParts() {
    return [
      (this.color & 0x00FF0000) >> 16,
      (this.color & 0x0000FF00) >> 8,
      (this.color & 0x000000FF)
    ];
  }
  
  set output(parts) {
    this.outputValue = 0x0 | ((parts[0] & 0xFF) << 16) | ((parts[1] & 0xFF) << 8) | (parts[2] & 0xFF);
  }
  
  get output() {
    return this.outputValue;
  }
}

module.exports = FlickerPixel;
