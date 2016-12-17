const e131 = require('e131');

function buildOutput() {
  const clients = [1,2,3].map(i => new e131.Client(i));
  clients.forEach(c => c.seq = 0);
  const channelsPerUniverse = 510;
  const pixelsPerUniverse = channelsPerUniverse/3;

  const numPixels = 510;
  const buffer = new ArrayBuffer(numPixels * 4);
  const pixels = new Uint32Array(buffer);

  function flush() {
    let channels = pixels.length * 3;
    let seq = 0;
    
    for (let universe = 0; universe < 3; universe ++) {
      let client = clients[universe];
      let packet = client.createPacket(channelsPerUniverse);
      let slotsData = packet.getSlotsData();
      packet.setSourceName('node.js');
      packet.setUniverse(universe+1);
      client.seq = (client.seq + 1) % 0xFF;
      packet.setSequenceNumber(client.seq);
      
      let basePixel = pixelsPerUniverse * universe;
      let channel = 0;
      for (let i = 0; i < pixelsPerUniverse; i ++) {
        let color = pixels[basePixel + i];
        slotsData[channel++] = (color & 0x00FF0000) >> 16;
        slotsData[channel++] = (color & 0x0000FF00) >> 8;
        slotsData[channel++] = (color & 0x000000FF);
      }
      
      client.send(packet, function() {});
    }
  }
  
  return { flush, pixels }
}
module.exports = buildOutput;
