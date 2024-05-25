import React from 'react';
import './FloorPlan.scss';

const FloorPlan = ({ member, onDrop }) => {
  const handleDrop = (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData('member');
    if (data){
      const member = JSON.parse(data);
      const rect = event.target.getBoundingClientRect();
      const position = {x: event.clientX - rect.left, y: event.clientY - rect.top};
      onDrop(member, position);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className='floor-plan' onDrop={handleDrop} onDragOver={handleDragOver}/>
  );
};

export default FloorPlan;
