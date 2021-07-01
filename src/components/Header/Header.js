import React, { useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavLink, Link } from 'react-router-dom';
import { authContext } from '../../context/auth/context';

const Footer = (props) => {
  const { loggedIn, user, logout } = useContext(authContext);

  return (
    <header>
      <Navbar bg='primary' variant='dark'>
        <Link className='navbar-brand' to='/'>
          Home
        </Link>
        <Nav className='ml-auto'>
          {loggedIn ? (
            <>
              <NavLink className='nav-link' to='/settings'>
                Settings
              </NavLink>
              <Navbar.Text>Welcome : {user.username}</Navbar.Text>
              <NavLink className='nav-link' to='/login' onClick={logout}>Logout</NavLink>
            </>
          ) : (
              <NavLink className='nav-link' to='/login'>Login</NavLink>
          )}
        </Nav>
      </Navbar>
    </header>
  );
};

export default Footer;
