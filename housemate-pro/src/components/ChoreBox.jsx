// import React, { useState } from 'react';
import './ChoreBox.scss';

// From Bootstrap
// https://getbootstrap.com/docs/5.3/components/card/
function ChoreBox({selectedMember}) {
    // console.log("ChoreBox -> selectedMember: " + selectedMember);
    // console.log("ChoreBox -> selectedMember.name: " + selectedMember.name);
    if (selectedMember)

    {    if (selectedMember.name  === undefined){
            console.log("ChoreBox -> SELECTED MEMBER === NULL");
            return (
                <div className="card">
                {/* <img src="..." className="card-img-top" alt="..."/> */}
                <div className="card-body">
                    {/* {selectedMember === null && (<h5 className="card-title">All Chores</h5>)} */}
                    <h5 className = "card-title">Completed Chores</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                    <p> Selected member: {selectedMember.name}</p>
                </div>
                </div>);
        }else{
            console.log("ChoreBox -> SELECTED MEMBER != NULL");
            return (
                <div className="card">
                {/* <img src="..." className="card-img-top" alt="..."/> */}
                <div className="card-body">
                    <h5 className="card-title">All Chores</h5>
                    <h5 className = "card-title"> {selectedMember.name}'s Chores</h5>
                    
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                    <p> Selected member: {selectedMember.name}</p>
                </div>
                </div>
            );}
    }
    
    
}

export default ChoreBox;
