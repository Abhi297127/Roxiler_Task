import React, { useState } from 'react';
import { Form, Button, Card, Container } from 'react-bootstrap';
import { createUser } from '../../services/adminService';
import { useNavigate } from 'react-router-dom';

const CreateUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    role: 'user'
  });
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
      await createUser(formData);
      navigate('/admin/users');
    } catch (error) {
      console.error('User creation failed:', error);
    }
  };

  return (
    <Container>
      <h2 className="mb-4">Create New User</h2>
      <Card>
        <Card.Body>
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

            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="user">User</option>
                <option value="store_owner">Store Owner</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit">
              Create User
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CreateUser;