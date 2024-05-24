import React, { useState } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import AddMemberForm from './components/AddMemberForm';
import AssignChoreForm from './components/AssignChoreForm';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const initialMembers = [
  {
    id: 1,
    name: 'Bobby',
    imgSrc: `${process.env.PUBLIC_URL}/Nerd.jpg`,
    chores: [
      { choreName: 'Do the dishes', choreLocation: 'Kitchen', dueDate: '2024-06-01', assignedTo: 'Nerd' },
      { choreName: 'Take out the trash', choreLocation: 'Garage', dueDate: '2024-06-02', assignedTo: 'Nerd' }
    ],
  },
  {
    id: 2,
    name: 'Cathie',
    imgSrc: `${process.env.PUBLIC_URL}/Happy.jpg`,
    chores: [
      { choreName: 'Vacuum the house', choreLocation: 'Living Room', dueDate: '2024-06-03', assignedTo: 'Happy' },
      { choreName: 'Water the plants', choreLocation: 'Garden', dueDate: '2024-06-04', assignedTo: 'Happy' }
    ],
  },
];

function App() {
  const [householdMembers, setHouseholdMembers] = useState(initialMembers);
  const [showAddMemberForm, setShowAddMemberForm] = useState(false);
  const [showAssignChoreForm, setShowAssignChoreForm] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
  const appendAlert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" onclick="this.parentElement.remove()" aria-label="Close"></button>',
      '</div>'
    ].join('')

    alertPlaceholder.append(wrapper)
  }

  const handleAddMember = (member) => {
    if (householdMembers.find((mem) => mem.name===member.name)){
      
      appendAlert('WOOPS ALREADY A USER!', 'warning')
    }
    else {
    setHouseholdMembers([...householdMembers, member]);
    }
  };

  const handleAddChore = (chore) => {
      
    const myMember = householdMembers.find((member) => member.name===chore.assignedTo);
      console.log(myMember);
      setHouseholdMembers(
        householdMembers.map((member) =>
          member.id === myMember.id
            ? { ...member, chores: [...member.chores, chore] }
            : member
        )
      );
      setSelectedMember({
        ...myMember,
        chores: [...myMember.chores, chore],
      });
      setShowAssignChoreForm(false);
  };

  const openAddMemberForm = () => {
    setShowAddMemberForm(true);
  };

  const closeAddMemberForm = () => {
    setShowAddMemberForm(false);
  };

  const openAssignChoreForm = () => {
    setShowAssignChoreForm(true);
  };

  const closeAssignChoreForm = () => {
    setShowAssignChoreForm(false);
  };

  const selectMember = (member) => {
    setSelectedMember(member);
  };

  const handleReset=()=> {
    setSelectedMember(null);
    setShowAssignChoreForm(false);
  }

  
  return (
    <Router>
    <div className="App">
      <Navbar onRequestNewChore={openAssignChoreForm} onReset={handleReset}/>
      {showAddMemberForm && <AddMemberForm onAddMember={handleAddMember} onClose={closeAddMemberForm} householdMembers={householdMembers} />}
      {showAssignChoreForm && <AssignChoreForm onAddChore={handleAddChore} onClose={closeAssignChoreForm} />}
      
      <div id="liveAlertPlaceholder"></div>

      <div className="main-content">
        <div className="floor-plan">
          <h2>Floor Plan</h2>
          <img src={`${process.env.PUBLIC_URL}/2D-floor-plan-with-room-color.jpg`} alt="2D Floor Plan" />
          <div className="members">
            {householdMembers.map((member) => (
              <img
                key={member.id}
                src={member.imgSrc}
                alt={member.name}
                className="member-photo"
                onClick={() => selectMember(member)}
              />
            ))}
            <button className="add-member-button" onClick={openAddMemberForm}>+</button>

          </div>
        </div>

        {selectedMember && selectedMember.chores.length > 0 && (
          <div className="chores">
            <h2>Chores for {selectedMember.name}</h2>
            <ul>
              {selectedMember.chores.map((chore, index) => (
                <li key={index}>{chore.choreName}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
    </Router>
  );
}

export default App;