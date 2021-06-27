import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

const Footer = (props) => {
  return (
    <header>
      <Navbar bg="primary" variant="dark">
      <Navbar.Brand href="#home">Home</Navbar.Brand>
      {/* <Nav className="me-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#features">Features</Nav.Link>
        <Nav.Link href="#pricing">Pricing</Nav.Link>
      </Nav> */}
    </Navbar>
    </header>
  );
};

export default Footer;
