import React, { useState } from 'react';
import './AssignChoreForm.scss';

const AssignChoreForm = ({ onAddChore, onClose }) => {
  const [choreName, setChoreName] = useState('');
  const [choreLocation, setChoreLocation] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [assignedTo, setAssignedTo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (choreName && choreLocation && dueDate && assignedTo) {
      onAddChore({ choreName, choreLocation, dueDate, assignedTo });
      setChoreName('');
      setChoreLocation('');
      setDueDate('');
      setAssignedTo('');
    }
  };

  return (
    <div className="form-container">
      <button className="close-button" onClick={onClose}>x</button>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Chore Name:</label>
          <input
            type="text"
            value={choreName}
            onChange={(e) => setChoreName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Chore Location:</label>
          <input
            type="text"
            value={choreLocation}
            onChange={(e) => setChoreLocation(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Due Date:</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Assigned To:</label>
          <input
            type="text"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            required
          />
        </div>
        <button type="submit">Assign Chore</button>
      </form>
    </div>
  );
};

export default AssignChoreForm;
