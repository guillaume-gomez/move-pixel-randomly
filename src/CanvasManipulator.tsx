import React, { useState, useEffect } from 'react';
import { useCanvas } from "./useCanvas";
import artwork from './solene.png';

function CanvasManipulator() {
  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(600);
  const { canvasRef } = useCanvas(width, height, draw, 1000);

  function draw(context: CanvasRenderingContext2D) {
    console.log("pni")
    const image = new Image();
    image.onload = () => {
      setWidth(image.width);
      setHeight(image.height);
      
      context.drawImage(image, 0, 0);
    
      const imageData = context.getImageData(0, 0, image.width, image.height);

      const { data } = imageData;
      for (let i = 0; i < data.length; i += 4) {
        if(data[i] > 180 && data[i+1] > 180 && data[i+2] > 180) {
          //let moy = (data[i] + data[i + 1] + data[i + 2]) / 3;
          //data[i]     = moy; // rouge
          //data[i + 1] = moy; // vert
          //data[i + 2] = moy; // bleu
          data[i] = Math.random() * 255 + 50;
          data[i+1] = Math.random() * 255 + 75;
          data[i+2] = Math.random() * 255 + 25;
        }
      }
      context.putImageData(imageData, 0, 0);

    }
    image.src = artwork;
  }

  return (
    <div className="App">
      <canvas ref={canvasRef} width={width} height={height} id="viewport"></canvas>
    </div>
  );
}

export default CanvasManipulator;
