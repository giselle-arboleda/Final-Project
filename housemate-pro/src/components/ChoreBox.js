// import React, { useState } from 'react';
import './ChoreBox.scss';

// From Bootstrap
// https://getbootstrap.com/docs/5.3/components/card/
function ChoreBox(selectedMember){

    
    return (
        <div className="card">
        {/* <img src="..." className="card-img-top" alt="..."/> */}
        <div className="card-body">
            {selectedMember === null && (<h5 className="card-title">All Chores</h5>)}
        
            
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
            <p> Selected member: {selectedMember.chores}</p>
        </div>
        </div>
    );
}

export default ChoreBox;
