import React, { useState, useEffect } from 'react';
import { useCanvas } from "./useCanvas";
import artwork from './solene-min.png';

function getRandomInt(min:number, max:number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function CanvasManipulator() {
  const [width, setWidth] = useState<number>(600);
  const [height, setHeight] = useState<number>(600);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [image, setImage] = useState<HTMLImageElement|null>(null);
  const { canvasRef } = useCanvas(width, height, draw, true);

  useEffect(() => {
     const image = new Image();
     image.onload = () => {
      setWidth(image.width);
      setHeight(image.height);
      setIsLoaded(true);
     };
     image.src = artwork;
     setImage(image);
  },[setImage]);

  function draw(context: CanvasRenderingContext2D) {
    if(!image || !isLoaded) {
      return;
    }
    context.drawImage(image, 0, 0);
  
    const imageData = context.getImageData(0, 0, image.width, image.height);
    const offset = getRandomInt(0, 5);

    const { data } = imageData;
    for (let i = 0; i < data.length; i += 4) {
        const x = ((i/4) % image.width);
        if(isNotBackground(data[i], data[i+1], data[i+2]) && ((x + offset) < image.width) && ((x + offset) >= 0)) {
          const offsetPixel = (offset*4);
          data[i] = data[i + offsetPixel]
          data[i + 1] = data[i + offsetPixel + 1]
          data[i + 2] = data[i + offsetPixel + 2]
         } else {
          // choose the pixel on the left before the move 
          data[i] = 255;
          data[i + 1] = 255;
          data[i + 2] = 255;
        }
    }
    context.putImageData(imageData, 0, 0);

  }

  function isNotBackground(red: number, green: number, blue: number) : boolean {
    return red <= 180 || green <= 180 || blue <= 180;
  }
  return (
    <div className="App">
      <canvas ref={canvasRef} width={width} height={height} id="viewport"></canvas>
    </div>
  );
}

export default CanvasManipulator;
