import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Container } from 'react-bootstrap';
import { createStore, getUsers } from '../../services/adminService';
import { useNavigate } from 'react-router-dom';

const CreateStore = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    ownerId: ''
  });
  const [storeOwners, setStoreOwners] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStoreOwners = async () => {
      try {
        const users = await getUsers();
        const owners = users.filter(user => user.role === 'store_owner');
        setStoreOwners(owners);
      } catch (error) {
        console.error('Failed to fetch store owners:', error);
      }
    };

    fetchStoreOwners();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createStore(formData);
      navigate('/admin/stores');
    } catch (error) {
      console.error('Store creation failed:', error);
    }
  };

  return (
    <Container>
      <h2 className="mb-4">Create New Store</h2>
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Store Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter store name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter store email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="address"
                placeholder="Enter store address"
                value={formData.address}
                onChange={handleChange}
                maxLength={400}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Store Owner</Form.Label>
              <Form.Select
                name="ownerId"
                value={formData.ownerId}
                onChange={handleChange}
                required
              >
                <option value="">Select Store Owner</option>
                {storeOwners.map(owner => (
                  <option key={owner.id} value={owner.id}>{owner.name}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit">
              Create Store
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CreateStore;