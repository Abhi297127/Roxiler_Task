import React, { useEffect, useState } from 'react';
import { Table, Card, Container } from 'react-bootstrap';
import { getStoresByOwner } from '../../services/storeOwnerService';
import { useAuth } from '../../context/AuthContext';
import RatingStars from '../common/RatingStars';

const StoreRatings = () => {
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

  return (
    <Container>
      <h2 className="mb-4">My Stores Ratings</h2>
      {stores.length === 0 ? (
        <Card>
          <Card.Body>No stores assigned to you.</Card.Body>
        </Card>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Store Name</th>
              <th>Address</th>
              <th>Average Rating</th>
              <th>Total Ratings</th>
            </tr>
          </thead>
          <tbody>
            {stores.map(store => (
              <tr key={store.id}>
                <td>{store.name}</td>
                <td>{store.address}</td>
                <td>
                  <RatingStars rating={parseFloat(store.avgRating)} editable={false} />
                  ({store.avgRating})
                </td>
                <td>{store.totalRatings}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default StoreRatings;