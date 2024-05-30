import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProgressBarComponent = ({ householdMembers }) => {
  const calculateProgress = () => {
    const totalChores = householdMembers.reduce((sum, member) => sum + member.chores.length, 0);
    const completedChores = householdMembers.reduce(
      (sum, member) => sum + member.chores.filter((chore) => chore.completed).length,
      0
    );
    return totalChores === 0 ? 0 : Math.round((completedChores / totalChores) * 100);
  };
  
  const progress = calculateProgress();
  
  return <ProgressBar now={progress} label={`${progress}%`} />;
};

export default ProgressBarComponent;
