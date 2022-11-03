import SubTitle from '@/components/SubTitle';
import ExternalLink from '@/components/ExternalLink';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import { useState } from 'react';

const initialPosition = {
  x: 0,
  y: 0,
};

export default function UseStateDraggableBox() {
  const [shape, setShape] = useState({
    color: 'orange',
    position: initialPosition,
  });

  function handleMove(dx, dy) {
    setShape({
      ...shape,
      position: {
        x: shape.position.x + dx,
        y: shape.position.y + dy,
      },
    });
  }

  function handleColorChange(e) {
    setShape({
      ...shape,
      color: e.target.value,
    });
  }

  return (
    <LayoutToExperiments title='useState Draggable Box' domain='React'>
      <SubTitle>
        Draggable Box By
        <ExternalLink
          href='https://beta.reactjs.org/learn/updating-objects-in-state'
          name='beta.reactjs.org'
        />
      </SubTitle>
      <div className='mb-5 w-full sm:w-1/6'>
        <select value={shape.color} onChange={handleColorChange}>
          <option value='orange'>Orange</option>
          <option value='lightpink'>Lightpink</option>
          <option value='aliceblue'>Aliceblue</option>
        </select>
      </div>
      <Background position={initialPosition} />
      <Box color={shape.color} onMove={handleMove} position={shape.position}>
        Drag Me!
      </Box>
    </LayoutToExperiments>
  );
}

// initial value of useState should be null, can't {x: 0, y: 0}, or it will buggy like shit
function Box({ children, color, position, onMove }) {
  const [lastCoordinates, setLastCoordinates] = useState<{ x: number; y: number } | null>(null);

  function handlePointerDown(e) {
    e.target.setPointerCapture(e.pointerId);
    setLastCoordinates({
      x: e.clientX,
      y: e.clientY,
    });
  }

  function handlePointerMove(e) {
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

  function handlePointerUp(e) {
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
        cursor: 'grab',
        backgroundColor: color,
        position: 'absolute',
        border: '1px solid black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      {children}
    </div>
  );
}

function Background({ position }) {
  return (
    <div
      style={{
        position: 'absolute',
        transform: `translate(${position.x}px, ${position.y})`,
        width: 250,
        height: 250,
        backgroundColor: `rgba(200, 200, 0, 0.2)`,
      }}
    />
  );
}
