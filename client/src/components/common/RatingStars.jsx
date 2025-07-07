import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const RatingStars = ({ rating, setRating, editable = true }) => {
  const [hover, setHover] = useState(null);

  const handleClick = (value) => {
    if (editable && setRating) {
      setRating(value);
    }
  };

  return (
    <div>
      {[...Array(5)].map((_, i) => {
        const ratingValue = i + 1;
        return (
          <label key={i}>
            <FaStar
              className="rating-star"
              color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
              size={24}
              onMouseEnter={() => editable && setHover(ratingValue)}
              onMouseLeave={() => editable && setHover(null)}
              onClick={() => handleClick(ratingValue)}
              style={{ cursor: editable ? 'pointer' : 'default' }}
            />
          </label>
        );
      })}
    </div>
  );
};

export default RatingStars;