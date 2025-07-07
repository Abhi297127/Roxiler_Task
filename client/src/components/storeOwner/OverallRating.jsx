import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { getStoresByOwner } from '../../services/storeOwnerService';
import { useAuth } from '../../context/AuthContext';

const OverallRating = () => {
  const [stores, setStores] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchStores = async () => {
      if (user && user.id) {
        try {
          const data = await getStoresByOwner(user.id);
          setStores(data);
        } catch (error) {
          console.error('Failed to fetch stores:', error);
        }
      }
    };

    fetchStores();
  }, [user]);

  const calculateOverallRating = () => {
    if (stores.length === 0) return 0;
    
    const totalRatings = stores.reduce((sum, store) => {
      return sum + (parseFloat(store.avgRating) * store.totalRatings);
    }, 0);
    
    const totalCount = stores.reduce((sum, store) => sum + store.totalRatings, 0);
    
    return totalCount > 0 ? (totalRatings / totalCount).toFixed(1) : 0;
  };

  return (
    <Container>
      <h2 className="mb-4">Overall Rating</h2>
      <Row>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Average Rating Across All Stores</Card.Title>
              <Card.Text className="display-4">{calculateOverallRating()}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Total Stores</Card.Title>
              <Card.Text className="display-4">{stores.length}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OverallRating;