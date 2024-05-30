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
import MembersComponent from './components/MembersComponent';
import ProgressBarComponent from './components/ProgressBarComponent';

// import Logger from 'simple-console-logger';
// Logger.configure({level: 'debug'});

const initialMembers = [
  {
    id: 1,
    name: 'Bobby',
    imgSrc: `${process.env.PUBLIC_URL}/Nerd.jpg`,
    chores: [
      { choreName: 'Do the dishes', choreLocation: 'Kitchen', dueDate: '2024-06-01', assignedTo: 'Bobby' },
      { choreName: 'Take out the trash', choreLocation: 'Garage', dueDate: '2024-06-02', assignedTo: 'Bobby' }
    ],
    position: {x:0 , y:0}
  },
  {
    id: 2,
    name: 'Cathie',
    imgSrc: `${process.env.PUBLIC_URL}/g410.svg`,
    chores: [
      { choreName: 'Vacuum the house', choreLocation: 'Living Room', dueDate: '2024-06-03', assignedTo: 'Cathie' },
      { choreName: 'Water the plants', choreLocation: 'Garden', dueDate: '2024-06-04', assignedTo: 'Cathie' }
    ],
  },
];

const imageSources = ['/Stars.jpg', '/Nerd.jpg', '/Happy.jpg', '/Crazy.jpg', '/Heart.jpg',  '/Sleepy.jpg']

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
    setMembers([...members, member]);
    }
  };

  const handleAddChore = (chore) => {
      
    const myMember = householdMembers.find((member) => member.name===chore.assignedTo);
      // console.log(myMember);
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
    setHouseholdMembers((prevMembers) =>
      prevMembers.map((member) => ({ ...member, position: { x: 0, y: 0 } }))
    );
    setMembers((prevMembers) =>
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
    setMembers((prevMembers) => {
      prevMembers.map((m) =>
        m.id === member.id ? { ...m, position } : m
      )
    });
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

  return (
    <Router>
    <div className="App">
      <Navbar onRequestNewChore={openAssignChoreForm} onReset={handleReset}/>
      {showAddMemberForm && <AddMemberForm onAddMember={handleAddMember} onClose={closeAddMemberForm} householdMembers={householdMembers} imageSources={imageSources}/>}
      {showAssignChoreForm && <AssignChoreForm onAddChore={handleAddChore} onClose={closeAssignChoreForm} />}
      
      
      {/* <FloorPlan onDrop={handleDrop} /> */}
      
      <div id="liveAlertPlaceholder"></div>

      <div className='progress-bar'>
        <h2>Household Chore Completion Status</h2>
        <ProgressBarComponent householdMembers={householdMembers} />
      </div>
    
      <div className="main-content">
        
        <div className="floor-plan">
          <h2>Floor Plan</h2>
          <img src={`${process.env.PUBLIC_URL}/2D-floor-plan-with-room-color.jpg`} alt="2D Floor Plan of a House" />
          <h2>Drag & Drop</h2>
            {members.map((member) => (
              <DraggableMember key={member.id} member={member} onDragEnd={handleDragEnd} />
            ))}
          
        
        
        </div>

        <MembersComponent style='column' householdMembers={householdMembers} setSelectedMember={setSelectedMember} setShowAddMemberForm={setShowAddMemberForm}></MembersComponent>

        <div className="">
          {/* Display All Completed Chores OR Display Selected Person's Chores */}
          {/* <ChoreBox selectedMember={selectedMember}></ChoreBox> */}
          <ChoreBox selectedMember={selectedMember} householdMembers={householdMembers} setHouseholdMembers={setHouseholdMembers}></ChoreBox>
        </div>
        
      </div>
    </div>
    </Router>
  );
}

export default App;
