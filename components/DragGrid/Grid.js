import React from 'react';
import { useDrop } from 'react-dnd';

const Grid = ({ onDrop }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gridTemplateRows: 'repeat(12, 1fr)',
        width: '100vw',
        height: '100vh',
        border: '1px solid #000',
      }}
    >
      {Array.from({ length: 144 }).map((_, index) => (
        <DroppableZone key={index} index={index} onDrop={onDrop} />
      ))}
    </div>
  );
};

const DroppableZone = ({ index, onDrop }) => {
  const [, ref] = useDrop({
    accept: 'BOX',
    drop: (item, monitor) => {
      onDrop(index);
    },
  });

  return (
    <div
      ref={ref}
      style={{
        border: '1px solid #ccc',
        boxSizing: 'border-box',
      }}
    />
  );
};

export default Grid;
