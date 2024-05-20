import React from "react";

interface Props {}

function BigCard() {
  return (
    <div className="card">
      <img src="..." className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">
          Information in this card should change according to what is passed in
          (TODO). For example, when clicking on someone, the card's information
          will change to show someone's chores. This should also be aligned to
          the right.
        </p>
        <a href="#" className="btn btn-primary">
          Go somewhere
        </a>
      </div>
    </div>
  );
}

export default BigCard;
