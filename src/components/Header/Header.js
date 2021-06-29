import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavLink, Link } from 'react-router-dom';

const Footer = (props) => {
  return (
    <header>
      <Navbar bg="primary" variant="dark">
      <Link className='navbar-brand' to='/'>Home</Link>
      <Nav className="me-auto">
        <NavLink className='nav-link' to='/settings'>Settings</NavLink>
      </Nav>
    </Navbar>
    </header>
  );
};

export default Footer;
