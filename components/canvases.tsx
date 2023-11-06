import { useEffect, useRef } from 'react';

export function NoiseCanvas(props: any) {
  //useRef
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current! as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;
    const len = data.length;
    const scale = 0.1;
    const z = Math.random() * 100;
    for (let i = 0; i < len; i += 4) {
      const x = (i / 4) % width;
      const y = Math.floor(i / 4 / width);
      const value = Math.round(Math.random() * 128);
      data[i] = value;
      data[i + 1] = value;
      data[i + 2] = value;
      data[i + 3] = 255;
    }
    ctx.putImageData(imageData, 0, 0);
    //fillStyle
  }, []);
  return <canvas id="noise-canvas" {...props} ref={canvasRef} />;
}

const CRTSimulation = (props: any) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawCRTLines = (context: CanvasRenderingContext2D, w: number, h: number) => {
    const lines = h / 3; // Adjust the number of lines according to the height of the canvas
    for (let i = 0; i < lines; i++) {
      context.fillStyle = `rgba(0, 0, 0, ${(i % 2) * 0.1 + 0.7})`; // Alter the opacity for the scanline effect
      context.fillRect(0, i * 3, w, 1); // Draw horizontal lines with 2px gaps
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext('2d')!;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Draw the CRT effect
    const draw = () => {
      context.clearRect(0, 0, width, height); // Clear the canvas

      // Your code to draw the content goes here.
      // For instance, you might want to display an image or some graphics.

      drawCRTLines(context, width, height);

      requestAnimationFrame(draw); // Repeatedly run draw to create the animation effect
    };

    draw();
  }, []);

  return <canvas ref={canvasRef} {...props} />;
};

export default CRTSimulation;
