import React, { useState, useEffect } from 'react';
import { useDrag } from 'react-dnd';

const Box = () => {
  const [position, setPosition] = useState({ gridColumn: 1, gridRow: 1 });

  const [, ref] = useDrag({
    type: 'BOX',
  });

  useEffect(() => {
    // Update the position of the box whenever it's dropped
    const handleDrop = (index) => {
      const row = Math.floor(index / 12) + 1;
      const column = (index % 12) + 1;
      setPosition({ gridColumn: column, gridRow: row });
    };
    window.addEventListener('drop', handleDrop);
    return () => {
      window.removeEventListener('drop', handleDrop);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        gridColumn: position.gridColumn,
        gridRow: position.gridRow,
        backgroundColor: 'blue',
        cursor: 'move',
      }}
    />
  );
};

export default Box;
