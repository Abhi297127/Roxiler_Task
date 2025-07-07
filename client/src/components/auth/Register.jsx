import React, { useState } from 'react';
import { Form, Button, Card, Container } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: ''
  });
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <Card style={{ width: '400px' }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">Register</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name (20-60 characters)</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter full name"
                value={formData.name}
                onChange={handleChange}
                minLength={20}
                maxLength={60}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password (8-16 chars, 1 uppercase, 1 special)</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                minLength={8}
                maxLength={16}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Address (max 400 characters)</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="address"
                placeholder="Enter address"
                value={formData.address}
                onChange={handleChange}
                maxLength={400}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Register
            </Button>
          </Form>
          <div className="text-center mt-3">
            Already have an account? <a href="/login">Login</a>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register;