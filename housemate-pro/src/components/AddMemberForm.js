import React, { useState } from 'react';
import './AddMemberForm.scss';

const AddMemberForm = ({ onAddMember, onClose, householdMembers }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && email) {
      onAddMember({
        id: householdMembers.length + 1,
        name: username,
        imgSrc: `${process.env.PUBLIC_URL}/Nerd.jpg`,
        chores: [
          ],
      });
      setUsername('');
      setEmail('');
    }
  };

  return (
    <div className="form-container">
      <button className="close-button" onClick={onClose}>x</button>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Member</button>
      </form>
    </div>
  );
};

export default AddMemberForm;
