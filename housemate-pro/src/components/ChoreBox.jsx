import React, { useState } from 'react';
import './ChoreBox.scss';



// From Bootstrap
// https://getbootstrap.com/docs/5.3/components/card/
function ChoreBox({selectedMember, householdMembers, setHouseholdMembers}) { //  
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
          imgSrc: `${process.env.PUBLIC_URL}/Happy.jpg`,
          chores: [
            { choreName: 'Vacuum the house', choreLocation: 'Living Room', dueDate: '2024-06-03', assignedTo: 'Cathie' },
            { choreName: 'Water the plants', choreLocation: 'Garden', dueDate: '2024-06-04', assignedTo: 'Cathie' }
          ],
        },
      ];
    
    // const [householdMembers, setHouseholdMembers] = useState(initialMembers);
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
    
    // to disable warning when building
    // eslint-disable-next-line
    // const handleAddMember = (member) => {
    //     if (householdMembers.find((mem) => mem.name===member.name)){
          
    //       appendAlert('WOOPS ALREADY A USER!', 'warning')
    //     }
    //     else {
    //     setHouseholdMembers([...householdMembers, member]);
    //     }
    //   };
    
    
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
    }


    const mapSelectedPersonChores = () => {
      if (selectedMember.chores.length === 0){
        return <p className="card-text">No Chores Assigned to {selectedMember.name}</p>
      }else{
        return (selectedMember.chores.map((chore, index) => (
          <li key={index}>
              <input
              type="checkbox"
              checked={chore.completed}
              onChange={() => handleChoreCompletion(selectedMember.id, index)}
              />
              <p>{chore.choreName} @ {chore.choreLocation}</p>
          </li>
      )));
      } 
    }


    const mapAllChores = () => {
      if (householdMembers.length === 0){
        return <p>(no members in the house yet)</p>;
      }

      let completedChores = [];
      // Find all completed chores
      for (let member of householdMembers){
        for (let chore of member.chores){
          // NEED TO ADD COMPLETED TO CHORES ARRAY
          if (chore.completed){
            completedChores.push(chore);
            console.log("chore completed pushed");
          }
        }
      }

      if (completedChores.length === 0){
        return <p>(no completed chores yet)</p>
      }

      // NEED TO ASSIGN CHORE ID
      // RIGHT NOW CHORE NAMES MUST BE UNIQUE
      return (completedChores.map((chore) => (
        // should be chore.choreId or something similar 
        <li key={chore.choreName}> 
              <p>{chore.assignedTo} completed {chore.choreName} in the {chore.choreLocation}</p>
        </li>
      )));
    }

    const getSelectedPersonImgSrc = () =>{
      if (selectedMember === null || selectedMember.imgSrc === null){
        return "";
      }
      return selectedMember.imgSrc;
    }

    const getSelectedPersonImgAlt = () =>{
      if (selectedMember === null || selectedMember.alt === null){
        return "";
      }
      return selectedMember.alt;
    }


    if (selectedMember === null){
          return (
              <div className="card">
              <img src={getSelectedPersonImgSrc()} className="card-img-top" alt={getSelectedPersonImgAlt()}/>
                <div className="card-body">
                    <h5 className = "card-title">All Completed Chores</h5>
                    {mapAllChores()}
                </div>
              </div>);
    }else{
        return (
            <div className="card chore-box-card">
            <img src={getSelectedPersonImgSrc()} className="chore-box-member-photo" alt={getSelectedPersonImgAlt()}/>
                <div className="card-body">
                    <h5 className = "card-title"> {selectedMember.name}'s Chores</h5>
                    {mapSelectedPersonChores()}
                </div>
            </div>
        );}
    }
    
    


export default ChoreBox;
