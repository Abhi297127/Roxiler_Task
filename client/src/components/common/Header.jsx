import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getNavLinks = () => {
    if (!isAuthenticated) {
      return (
        <>
          <Nav.Link as={Link} to="/login">Login</Nav.Link>
          <Nav.Link as={Link} to="/register">Register</Nav.Link>
        </>
      );
    }

    switch (user?.role) {
      case 'admin':
        return (
          <>
            <Nav.Link as={Link} to="/admin/dashboard">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/admin/users">Users</Nav.Link>
            <Nav.Link as={Link} to="/admin/stores">Stores</Nav.Link>
            <Nav.Link as={Link} to="/change-password">Change Password</Nav.Link>
            <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
          </>
        );
      case 'store_owner':
        return (
          <>
            <Nav.Link as={Link} to="/store-owner/ratings">My Stores</Nav.Link>
            <Nav.Link as={Link} to="/store-owner/overall">Overall Ratings</Nav.Link>
            <Nav.Link as={Link} to="/change-password">Change Password</Nav.Link>
            <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
          </>
        );
      case 'user':
        return (
          <>
            <Nav.Link as={Link} to="/user/stores">Stores</Nav.Link>
            <Nav.Link as={Link} to="/change-password">Change Password</Nav.Link>
            <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Store Rating App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {getNavLinks()}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;