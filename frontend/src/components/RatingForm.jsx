import React, { useState } from 'react';
import { submitRating } from '../api/rating';

function RatingForm({ storeId, reloadStores }) {
  const [value, setValue] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitRating({ storeId, value });
    reloadStores();
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex align-items-center">
      <select className="form-select me-2" value={value} onChange={(e) => setValue(Number(e.target.value))}>
        {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
      </select>
      <button type="submit" className="btn btn-primary">Rate</button>
    </form>
  );
}

export default RatingForm;
