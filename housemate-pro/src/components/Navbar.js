import React from 'react';
import {Navbar, Nav, Button} from 'react-bootstrap';
import './Navbar.scss';

const navbar = ({ onRequestNewChore, onReset }) => {

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home" onClick={onReset}>House-Mate Pro</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link>
            <Button className='request-chore-button' onClick={onRequestNewChore}>
              Assign New Chore
            </Button>

            <Button className='request-chore-button' onClick={onReset}>
              See Completed Chores
            </Button>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default navbar;
