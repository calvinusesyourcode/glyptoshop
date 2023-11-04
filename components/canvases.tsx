import { useEffect, useRef } from 'react';

export function NoiseCanvas(props: any) {
  //useRef
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current! as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
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
