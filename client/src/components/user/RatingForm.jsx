import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import RatingStars from '../common/RatingStars';
import { getUserRatingForStore, submitRating } from '../../services/userService';

const RatingForm = ({ storeId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [existingRating, setExistingRating] = useState(null);

  useEffect(() => {
    const fetchUserRating = async () => {
      try {
        const userRating = await getUserRatingForStore(storeId);
        if (userRating) {
          setExistingRating(userRating);
          setRating(userRating.rating);
          setComment(userRating.comment || '');
        }
      } catch (error) {
        console.error('Failed to fetch user rating:', error);
      }
    };

    fetchUserRating();
  }, [storeId]);

  const handleSubmit = async () => {
    try {
      await submitRating(storeId, rating, comment);
      setExistingRating({ rating, comment });
    } catch (error) {
      console.error('Failed to submit rating:', error);
    }
  };

  return (
    <div>
      <RatingStars rating={rating} setRating={setRating} />
      <textarea
        className="form-control mt-2"
        rows={2}
        placeholder="Add a comment (optional)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button 
        variant="primary" 
        size="sm" 
        className="mt-2"
        onClick={handleSubmit}
        disabled={rating === 0}
      >
        {existingRating ? 'Update Rating' : 'Submit Rating'}
      </Button>
    </div>
  );
};

export default RatingForm;