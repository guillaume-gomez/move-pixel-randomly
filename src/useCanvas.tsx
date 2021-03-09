import { useRef, useEffect, useCallback } from "react";

export function useCanvas(canvasWidth: number , canvasHeight: number, draw: (context: CanvasRenderingContext2D) => void, refresh: boolean = false) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const redrawMem = useCallback(function redraw(context: CanvasRenderingContext2D) {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    draw(context);
    requestAnimationFrame(() => redrawMem(context))
  }, [draw, canvasWidth, canvasHeight]);

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
        requestAnimationFrame(() =>redrawMem(context));
       } else {
        redrawMem(context);
      }
  }, [canvasRef, canvasWidth, canvasHeight, draw, refresh, redrawMem]);

  return { canvasRef };
}