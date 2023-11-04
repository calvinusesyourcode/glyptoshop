'use client';

import { createContext, useContext, useState } from 'react';
import { NoiseCanvas } from './canvases';

interface GameboyContext {
  button: string | null;
  setButton: React.Dispatch<React.SetStateAction<string | null>>;
  cursorPosition: { x: number; y: number };
  setCursorPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
  moveCursor: (xDelta: number, yDelta: number) => void;
  cursorAxesAvailable: { x: boolean; y: boolean };
  setCursorAxesAvailable: React.Dispatch<React.SetStateAction<{ x: boolean; y: boolean }>>;
}
const GameboyContext = createContext<GameboyContext | null>(null);

export const useGameboyContext = () => useContext(GameboyContext);

export function GamebodyBody({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-screen w-screen overflow-clip">
      <svg
        id="gameboy-body"
        className="absolute left-0 top-0 z-0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1920 1940"
      >
        <defs>
          <linearGradient
            id="b"
            x1="118"
            y1="942.5"
            x2="1800"
            y2="942.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#30302e" />
            <stop offset=".004" stopColor="#3d3e3b" />
            <stop offset=".012" stopColor="#62625f" />
            <stop offset=".023" stopColor="#9d9e98" />
            <stop offset=".03" stopColor="#c5c6bf" />
            <stop offset=".202" stopColor="#bcbdb6" />
            <stop offset=".482" stopColor="#a4a49f" />
            <stop offset=".5" stopColor="#a3a39e" />
            <stop offset=".744" stopColor="#b6b7b0" />
            <stop offset=".97" stopColor="#c4c5be" />
            <stop offset=".974" stopColor="#bfc0b9" />
            <stop offset=".979" stopColor="#b1b2ac" />
            <stop offset=".985" stopColor="#9a9b95" />
            <stop offset=".99" stopColor="#7a7b76" />
            <stop offset=".996" stopColor="#52524f" />
            <stop offset="1" stopColor="#30302e" />
          </linearGradient>
        </defs>
        <path
          d="m162.729,38h1592.541c24.687,0,44.729,20.043,44.729,44.729v1563.249c0,110.947-90.075,201.022-201.022,201.022H162.729c-24.687,0-44.729-20.043-44.729-44.729V82.729c0-24.687,20.043-44.729,44.729-44.729Z"
          fill="url(#b)"
          strokeWidth="0"
        />
      </svg>
      <div className="flex flex-wrap gap-0 opacity-30 mix-blend-overlay">
        <NoiseCanvas className="absolute left-0 top-0 z-0 h-full w-full" />
      </div>
      {/* <div className='flex gap-0 flex-wrap fixed opacity-100 mix-blend-overlay'> */}
      {/* <img src="/gameboy-handheld-grain02.png" height="100px" width="100px" className='w-[100vw] h-[20vw] opacity-20'/> */}
      {/* <img src="/gameboy-handheld-grain02.png" height="100px" width="100px" className='w-[100vw] h-[20vw] opacity-20 '/> */}
      {/* <img src="/gameboy-handheld-grain02.png" height="100px" width="100px" className='w-[100vw] h-[20vw] opacity-20 '/> */}
      {/* </div> */}
      <div className="absolute left-[10vw] top-[4vw] z-10 h-[40vw] w-[80vw] rounded-xl rounded-br-[30px] bg-gradient-to-r from-gray-500 to-gray-600 lg:h-[20vw] lg:rounded-br-[100px]" />
      <div className="absolute left-[10vw] top-[4vw] z-10 h-[40vw] w-[80vw] rounded-xl rounded-br-[30px] bg-gradient-to-r from-gray-500 to-gray-600 lg:h-[20vw] lg:rounded-br-[100px]"></div>

      <div className="absolute left-[10vw] top-[8vw] z-20 h-full w-[80vw] bg-yellow-500/0 lg:top-[6vw] ">
        {children}
      </div>
    </div>
  );
}

export function GameboyOverlay({ children }: { children: React.ReactNode }) {
  const [button, setButton] = useState<string | null>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorAxesAvailable, setCursorAxesAvailable] = useState({ x: true, y: false });
  const moveCursor = (xDelta: number, yDelta: number) => {
    setCursorPosition((prevCursorPosition) => {
      return {
        x: prevCursorPosition.x + (cursorAxesAvailable.x ? xDelta : 0),
        y: prevCursorPosition.y + (cursorAxesAvailable.y ? yDelta : 0)
      };
    });
  };
  return (
    <>
      <div
        id="screen-div"
        className="absolute left-[10vw] top-0 z-30 h-[30vw] w-[60vw] overflow-clip bg-green-400 lg:h-[15vw]"
      >
        <GameboyContext.Provider
          value={{
            button,
            setButton,
            cursorPosition,
            setCursorPosition,
            cursorAxesAvailable,
            setCursorAxesAvailable,
            moveCursor
          }}
        >
          {children}
        </GameboyContext.Provider>
      </div>
      <div
        id="buttons-overlay"
        className="absolute left-0
        top-[40vw] z-40 flex w-full justify-between lg:top-[18vw]"
      >
        <div className="relative">
          <AnalogStick className="h-[12vw] w-[12vw]" />
        </div>
        <div className="relative pr-[20vw]">
          <GameboyButtonBay className="absolute h-[20vw] w-[20vw]" />
          <div className="absolute">
            <button
              id="gameboy-button-B"
              className="h-fit w-fit translate-x-[3vw] translate-y-[4vw] transform rounded-full"
            >
              <RedButton className="h-[10vw] w-[10vw] " />
            </button>
            <button
              id="gameboy-button-A"
              className="h-fit w-fit translate-x-[3vw] translate-y-[4vw] transform rounded-full"
            >
              <RedButton className="h-[10vw] w-[10vw] lg:h-[7vw] lg:w-[7vw]" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export function GameboyScreen({
  children,
  products,
  ui
}: {
  children?: React.ReactNode;
  products: any;
  ui: 'collection' | 'product';
}) {
  const {
    button,
    setButton,
    cursorPosition,
    setCursorPosition,
    cursorAxesAvailable,
    setCursorAxesAvailable,
    moveCursor
  } = useGameboyContext()!;

  const cursorColumns = ui === 'collection' ? products.length : 1;
  const cursorRows = 1;
  return (
    <>
      <div
        id="gameboy-screen"
        className="flex h-full w-full items-start justify-start gap-2 p-[2vw]"
      >
        <span
          className={`rounded p-2 text-[5vw] ${
            cursorPosition.x % cursorColumns == 0 ? 'border bg-black' : ''
          }`}
        >
          1
        </span>
        <span
          className={`rounded p-2 text-[5vw] ${
            cursorPosition.x % cursorColumns == 2 ? 'border bg-black' : ''
          }`}
        >
          3
        </span>
        <span
          className={`rounded p-2 text-[5vw] ${
            cursorPosition.x % cursorColumns == 1 ? 'border bg-black' : ''
          }`}
        >
          2
        </span>
        <span
          className={`rounded p-2 text-[5vw] ${
            cursorPosition.x % cursorColumns == 3 ? 'border bg-black' : ''
          }`}
        >
          4
        </span>
      </div>
    </>
  );
}

// SVGs
export function RedButton(props: any) {
  return (
    <svg id="red-button-svg" {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 152 141">
      <ellipse
        cx="75.31"
        cy="70.6"
        rx="67.26"
        ry="62.94"
        fill="#a20000"
        stroke="#000"
        stroke-miterlimit="10"
        strokeWidth="5"
      />
    </svg>
  );
}
export function AnalogStick(props: any) {
  return (
    <svg id="analog-stick-svg" {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 398 393">
      <defs>
        <linearGradient
          id="b"
          x1="298.456"
          y1="300.456"
          x2="67.939"
          y2="69.939"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".013" stopColor="#c5c6bf" />
          <stop offset=".264" stopColor="#bbbcb5" />
          <stop offset="1" stopColor="#a3a39e" />
        </linearGradient>
      </defs>
      <circle cx="195" cy="197" r="163" fill="url(#b)" strokeWidth="0" />
      <rect x="78.5" y="152.5" width="233" height="89" rx="9.671" ry="9.671" strokeWidth="0" />
      <rect
        x="78.5"
        y="152.5"
        width="233"
        height="89"
        rx="9.671"
        ry="9.671"
        transform="translate(-2 392) rotate(-90)"
        strokeWidth="0"
      />
      <rect
        x="150"
        y="93"
        width="76"
        height="214"
        rx="7.965"
        ry="7.965"
        transform="translate(388 12) rotate(90)"
        fill="#0a0e12"
        strokeWidth="0"
      />
      <rect
        x="154"
        y="96"
        width="76"
        height="214"
        rx="7.965"
        ry="7.965"
        fill="#0a0e12"
        strokeWidth="0"
      />
    </svg>
  );
}
export function GameboyButtonBay(props: any) {
  return (
    <svg
      id="gameboy-button-bay-svg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 443 361"
      {...props}
    >
      <defs>
        <linearGradient
          id="b"
          x1="310.809"
          y1="271.644"
          x2="124.29"
          y2="85.126"
          gradientTransform="translate(-34.722 302.917) rotate(-65.624)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".013" stopColor="#c5c6bf" />
          <stop offset="1.564" stopColor="#bbbcb5" />
          <stop offset="5" stopColor="#a3a39e" />
        </linearGradient>
      </defs>
      <rect
        x="125.189"
        y="-26.127"
        width="184.72"
        height="409.024"
        rx="92.36"
        ry="92.36"
        transform="translate(292.027 -92.912) rotate(66)"
        fill="url(#b)"
        strokeWidth="0"
      />
    </svg>
  );
}
