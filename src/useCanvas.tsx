import { useRef, useEffect } from "react";

export function useCanvas(canvasWidth: number , canvasHeight: number, draw: (context: CanvasRenderingContext2D) => void, refresh?: number | null) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasObject = canvasRef.current;
      if(!canvasObject) {
        return;
      }
      const context = canvasObject.getContext("2d");
      if(!context) {
        return;
      }

      if(refresh) {
        setInterval(() => {
          console.log("marseil")
           //context.clearRect(0, 0, canvasWidth, canvasHeight);
           draw(context);
        }, refresh);
      } else {
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        draw(context);
      }
  }, [canvasRef, canvasWidth, canvasHeight, draw]);

  return { canvasRef };
}