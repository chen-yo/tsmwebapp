import React from 'react';
import './NavBar.css';
import { Nav, Navbar } from 'react-bootstrap';
import { NavLink} from 'react-router-dom';
import UserBar from './UserBar';

export default function NavBar(props) {

  return (
    <>
      <Navbar bg="dark" variant="dark" className="mb-4">
        <Navbar.Brand as="div">
          NightReport
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={NavLink} className="mr-1" to="/dashboard">Dashbaord</Nav.Link>
          <Nav.Link as={NavLink} className="mr-1" to="/filters">Filters</Nav.Link>
          <Nav.Link as={NavLink} className="mr-1" to="/reports">Reports</Nav.Link>
          <Nav.Link as={NavLink} className="mr-1" to="/settings">Settings</Nav.Link>
        </Nav>
        <UserBar />
      </Navbar>
    </>
  );
}
