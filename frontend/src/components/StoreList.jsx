import React, { useEffect, useState } from 'react';
import { fetchStores } from '../api/store';
import { submitRating, updateRating } from '../api/rating';

function StoreList() {
  const [stores, setStores] = useState([]);
  const [userRatings, setUserRatings] = useState({});

  useEffect(() => {
    loadStores();
  }, []);

  const loadStores = async () => {
    const storesData = await fetchStores();
    setStores(storesData);
  };

  const handleRate = async (storeId, value) => {
    if (userRatings[storeId]) {
      await updateRating(userRatings[storeId], value);
    } else {
      const response = await submitRating({ storeId, value });
      setUserRatings({ ...userRatings, [storeId]: response.id });
    }
    loadStores();
  };

  return (
    <div>
      <h3>Store List</h3>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Store Name</th>
            <th>Address</th>
            <th>Overall Rating</th>
            <th>Your Rating</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {stores.map(store => (
            <tr key={store.id}>
              <td>{store.name}</td>
              <td>{store.address}</td>
              <td>
                {/* Safeguard to ensure ratings is an array */}
                {(Array.isArray(store.ratings) && store.ratings.length > 0) ? 
                  (store.ratings.reduce((a, b) => a + b.value, 0) / store.ratings.length).toFixed(2) 
                  : "No Ratings"}
              </td>
              <td>{userRatings[store.id] ? "Rated" : "Not Rated"}</td>
              <td>
                <input 
                  type="number" 
                  min="1" 
                  max="5" 
                  onChange={(e) => handleRate(store.id, +e.target.value)}
                  className="form-control"
                  placeholder="1-5"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StoreList;
