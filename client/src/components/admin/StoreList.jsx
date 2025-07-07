import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Form, Row, Col } from 'react-bootstrap';
import { getStores } from '../../services/adminService';
import { Link } from 'react-router-dom';
import RatingStars from '../common/RatingStars';

const StoreList = () => {
  const [stores, setStores] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const data = await getStores();
        setStores(data);
      } catch (error) {
        console.error('Failed to fetch stores:', error);
      }
    };

    fetchStores();
  }, []);

  const filteredStores = stores.filter(store =>
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (store.owner && store.owner.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Container>
      <h2 className="mb-4">Store Management</h2>
      <Row className="mb-3">
        <Col>
          <Form.Control
            type="text"
            placeholder="Search stores..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col md="auto">
          <Button as={Link} to="/admin/stores/create" variant="primary">
            Create New Store
          </Button>
        </Col>
      </Row>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Owner</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {filteredStores.map(store => (
            <tr key={store.id}>
              <td>{store.name}</td>
              <td>{store.email}</td>
              <td>{store.address}</td>
              <td>{store.owner ? store.owner.name : 'N/A'}</td>
              <td>
                <RatingStars rating={parseFloat(store.avgRating)} editable={false} />
                ({store.avgRating})
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default StoreList;