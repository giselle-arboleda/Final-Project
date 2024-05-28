import React, { useState } from 'react';
import './AddMemberForm.scss';

const AddMemberForm = ({ onAddMember, onClose, householdMembers, imageSources }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [imgSource, setImgSource] = useState(`${process.env.PUBLIC_URL}/Happy.jpg`);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && email) {
      onAddMember({
        id: householdMembers.length + 1,
        name: username,
        imgSrc: imgSource,
        chores: [
          ],
      });
      setUsername('');
      setEmail('');
      setImgSource(`${process.env.PUBLIC_URL}/Happy.jpg`);
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
        <div>
          {imageSources.map((image) => (
            <img src={`${process.env.PUBLIC_URL}` + image} className='add-member-photo' onClick={() => setImgSource(`${process.env.PUBLIC_URL}` + image)} alt={image}></img>

          ))}
        </div> 
        
               
        <button type="submit">Add Member</button>
      </form>
    </div>
  );
};

export default AddMemberForm;
