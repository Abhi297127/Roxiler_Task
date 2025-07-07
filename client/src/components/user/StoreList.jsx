import React, { useEffect, useState } from 'react';
import { Table, Card, Container } from 'react-bootstrap';
import { getStores } from '../../services/userService';
import RatingForm from './RatingForm';

const StoreList = () => {
  const [stores, setStores] = useState([]);

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

  return (
    <Container>
      <h2 className="mb-4">Stores</h2>
      {stores.length === 0 ? (
        <Card>
          <Card.Body>No stores available.</Card.Body>
        </Card>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Store Name</th>
              <th>Address</th>
              <th>Average Rating</th>
              <th>Your Rating</th>
            </tr>
          </thead>
          <tbody>
            {stores.map(store => (
              <tr key={store.id}>
                <td>{store.name}</td>
                <td>{store.address}</td>
                <td>
                  {store.avgRating} ({store.totalRatings} ratings)
                </td>
                <td>
                  <RatingForm storeId={store.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default StoreList;