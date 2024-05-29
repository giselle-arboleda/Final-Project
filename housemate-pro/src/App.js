import React, { useState } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import AddMemberForm from './components/AddMemberForm';
import AssignChoreForm from './components/AssignChoreForm';
import Navbar from './components/Navbar';
import ChoreBox from "./components/ChoreBox";
import DraggableMember from './components/DraggableMember';
// to disable warning when building
// eslint-disable-next-line
import FloorPlan from './components/FloorPlan';
import { ProgressBar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// import Logger from 'simple-console-logger';
// Logger.configure({level: 'debug'});

const initialMembers = [
  {
    id: 1,
    name: 'Bobby',
    imgSrc: `${process.env.PUBLIC_URL}/Nerd.jpg`,
    chores: [
      { choreName: 'Do the dishes', choreLocation: 'Kitchen', dueDate: '2024-06-01', assignedTo: 'Nerd' },
      { choreName: 'Take out the trash', choreLocation: 'Garage', dueDate: '2024-06-02', assignedTo: 'Nerd' }
    ],
    position: {x:0 , y:0}
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

const imageSources = ['/Stars.jpg', '/Nerd.jpg', '/Happy.jpg', '/Crazy.jpg']

function App() {
  const [householdMembers, setHouseholdMembers] = useState(initialMembers);
  const [showAddMemberForm, setShowAddMemberForm] = useState(false);
  const [showAssignChoreForm, setShowAssignChoreForm] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  // to disable warning when building
// eslint-disable-next-line
  const [members, setMembers] = useState(initialMembers);
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
      console.print("setSelectedMember: selected Member: " + selectedMember);
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
    console.log("App.js selectMember function -> selectMember.name:" + member.name);
  };

  const handleReset=()=> {
    setHouseholdMembers((prevMembers) =>
      prevMembers.map((member) => ({ ...member, position: { x: 0, y: 0 } }))
    );
    setSelectedMember(null);
    setShowAssignChoreForm(false);

  }

  const handleDragEnd = (position, member) => {
    setHouseholdMembers((prevMembers) =>
      prevMembers.map((m) =>
        m.id === member.id ? { ...m, position } : m
      )
    );
  };

  // to disable warning when building
  // eslint-disable-next-line
  const handleDrop = (member, position) => {
    setHouseholdMembers((prevMembers) =>
      prevMembers.map((m) =>
        m.id === member.id ? { ...m, position} : m
      )
    );
  };

  const handleChoreCompletion = (memberId, choreIndex) => {
    setHouseholdMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.id === memberId
          ? {
              ...member,
              chores: member.chores.map((chore, index) =>
                index === choreIndex ? { ...chore, completed: !chore.completed } : chore
              ),
            }
          : member
      )
    );

    if (selectedMember && selectedMember.id === memberId) {
      setSelectedMember((prevSelectedMember) => ({
        ...prevSelectedMember,
        chores: prevSelectedMember.chores.map((chore, index) =>
          index === choreIndex ? { ...chore, completed: !chore.completed } : chore
        ),
      }));
    }
  };

  const calculateProgress = () => {
    const totalChores = householdMembers.reduce((sum, member) => sum + member.chores.length, 0);
    const completedChores = householdMembers.reduce(
      (sum, member) => sum + member.chores.filter((chore) => chore.completed).length,
      0
    );
    return totalChores === 0 ? 0 : Math.round((completedChores / totalChores) * 100);
  };

  return (
    <Router>
    <div className="App">
      <Navbar onRequestNewChore={openAssignChoreForm} onReset={handleReset}/>
      {showAddMemberForm && <AddMemberForm onAddMember={handleAddMember} onClose={closeAddMemberForm} householdMembers={householdMembers} imageSources={imageSources}/>}
      {showAssignChoreForm && <AssignChoreForm onAddChore={handleAddChore} onClose={closeAssignChoreForm} />}
      
      
      {/* <FloorPlan onDrop={handleDrop} /> */}
      
      <div id="liveAlertPlaceholder"></div>

      <div className='progress-bar'>
        <h2>Household Chore Status</h2>
        <ProgressBar now={calculateProgress()} label={`${calculateProgress()}%`} />
      </div>

      <div className="main-content">
        <div className="floor-plan">
          <h2>Floor Plan</h2>
          <img src={`${process.env.PUBLIC_URL}/2D-floor-plan-with-room-color.jpg`} alt="2D Floor Plan" />
          <div className="members">
            <h2>View/Edit Members</h2>
            {householdMembers.map((member) => (
              <div key={member.id} className="member-container" onClick={() => selectMember(member)}>
              <img src={member.imgSrc} alt={member.name} className="member-photo" />
              <p className="member-name">{member.name}</p>
            </div>
              
            ))}
            <button className="add-member-button" onClick={openAddMemberForm}>+</button>

          </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
        {members.map((member) => (
          <DraggableMember key={member.id} member={member} onDragEnd={handleDragEnd} />
        ))}
        </div>

        <ChoreBox selectedMember={selectedMember}></ChoreBox>
        {console.log("AppJS APP()-> selectedMember: " + selectedMember)}
        
        {/* Ideally the below code would go into ChoreBox.js. But I'm Having trouble passing selectedMember into ChoreBox.js */}
        {selectedMember && (
            <div className="chores">
              <h2>Chores for {selectedMember.name}</h2>
              <ul>
                {selectedMember.chores.map((chore, index) => (
                  <li key={index}>
                    <input
                      type="checkbox"
                      checked={chore.completed}
                      onChange={() => handleChoreCompletion(selectedMember.id, index)}
                    />
                    {chore.choreName}
                  </li>
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
