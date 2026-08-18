"use client";

import {
  type ChangeEvent,
  type PointerEvent,
  type ReactNode,
  useState,
} from "react";
import ExternalLink from "@/components/ExternalLink";
import SubTitle from "@/components/SubTitle";

interface Position {
  x: number;
  y: number;
}

interface Shape {
  color: string;
  position: Position;
}

interface BoxProps {
  children: ReactNode;
  color: string;
  position: Position;
  onMove: (dx: number, dy: number) => void;
}

interface BackgroundProps {
  position: Position;
}

const initialPosition: Position = {
  x: 0,
  y: 0,
};

// initial value of useState should be null, can't {x: 0, y: 0}, or it will buggy like shit
function Box({ children, color, position, onMove }: BoxProps) {
  const [lastCoordinates, setLastCoordinates] = useState<{
    x: number;
    y: number;
  } | null>(null);

  function handlePointerDown(e: PointerEvent<HTMLDivElement>) {
    (e.target as HTMLDivElement).setPointerCapture(e.pointerId);
    setLastCoordinates({
      x: e.clientX,
      y: e.clientY,
    });
  }

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    if (lastCoordinates) {
      setLastCoordinates({
        x: e.clientX,
        y: e.clientY,
      });
      const dx = e.clientX - lastCoordinates.x;
      const dy = e.clientY - lastCoordinates.y;
      onMove(dx, dy);
    }
  }

  function handlePointerUp(_e: PointerEvent<HTMLDivElement>) {
    setLastCoordinates(null);
  }

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{
        width: 100,
        height: 100,
        cursor: "grab",
        backgroundColor: color,
        position: "absolute",
        border: "1px solid black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      {children}
    </div>
  );
}

function Background({ position }: BackgroundProps) {
  return (
    <div
      style={{
        position: "absolute",
        transform: `translate(${position.x}px, ${position.y})`,
        width: 250,
        height: 250,
        backgroundColor: "rgba(200, 200, 0, 0.2)",
      }}
    />
  );
}

export default function ReactUseStateDraggableBoxDemo() {
  const [shape, setShape] = useState<Shape>({
    color: "orange",
    position: initialPosition,
  });

  function handleMove(dx: number, dy: number) {
    setShape({
      ...shape,
      position: {
        x: shape.position.x + dx,
        y: shape.position.y + dy,
      },
    });
  }

  function handleColorChange(e: ChangeEvent<HTMLSelectElement>) {
    setShape({
      ...shape,
      color: e.target.value,
    });
  }

  return (
    <>
      <SubTitle>
        Draggable Box By
        <ExternalLink
          href="https://beta.reactjs.org/learn/updating-objects-in-state"
          name="beta.reactjs.org"
        />
      </SubTitle>
      <div className="mb-5 w-full sm:w-1/6">
        <select onChange={handleColorChange} value={shape.color}>
          <option value="orange">Orange</option>
          <option value="lightpink">Lightpink</option>
          <option value="aliceblue">Aliceblue</option>
        </select>
      </div>
      <Background position={initialPosition} />
      <Box color={shape.color} onMove={handleMove} position={shape.position}>
        Drag Me!
      </Box>
    </>
  );
}
