'use client';
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Grid from './Grid';
import Box from './Box';

const DragGrid = () => {
  const handleDrop = (index) => {
    console.log('Box dropped at ', index);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Grid onDrop={handleDrop} />
      <Box />
    </DndProvider>
  );
};

export default DragGrid;
