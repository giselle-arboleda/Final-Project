import React, { useState } from 'react';
import './Navbar.scss';

const Navbar = ({ onAssignChore }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="menu-icon" onClick={toggleDropdown}>☰</div>
      {isDropdownOpen && (
        <ul className="dropdown-menu">
          <li onClick={onAssignChore}>Assign New Chore</li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
