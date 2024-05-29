



const MembersComponent = ({ householdMembers, setSelectedMember, setShowAddMemberForm }) => {
    const selectMember = (member) => {
        setSelectedMember(member);
        console.log("App.js selectMember function -> selectMember.name:" + member.name);
      };

      const openAddMemberForm = () => {
        setShowAddMemberForm(true);
      };

    return (
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
        
    )
}

export default MembersComponent;
