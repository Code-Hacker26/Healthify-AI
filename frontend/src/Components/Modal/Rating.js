import React, { useState } from 'react';
import { Modal } from "flowbite-react";
import { Rating } from 'react-simple-star-rating';
import useApiHelper from '../../api';
import '../../styles/review.css';  // Importing the unique CSS file

const ReviewRating = ({ open, closeModal, consultationId }) => {
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(null);
    const api = useApiHelper();

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            'rating': rating,
            'review': review
        };

        api.rateReview(consultationId, data).then(res => {
            closeModal();
        }).catch(error => {
            console.log(error);
        });
    };

    return (
        <Modal 
            show={open} 
            size="md" 
            onClose={closeModal} 
            popup 
            className="review-rating-modal" 
            style={{ 
                marginTop: '70px', 
                backgroundImage: 'radial-gradient(circle at center, white, skyblue)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
                 
            }}  // Inline style for margin top
        >
            <Modal.Header />
            <Modal.Body>

                <form onSubmit={handleSubmit} method='post'>
                    <h4 className="review-rating-title mb-10">Rate Your Doctor</h4>
                    <div className='mb-5'>
                        <label htmlFor="rating" className="review-rating-label">Rate</label>
                        <Rating
                            onClick={(rate) => setRating(rate)}
                        />
                    </div>
                    <div className='mb-5'>
                        <label htmlFor="review" className="review-rating-label">Review</label>
                        <textarea 
                            onChange={(e) => setReview(e.target.value)} 
                            id="review" 
                            rows="4" 
                            className="review-rating-textarea" 
                            placeholder="Write your review here..."></textarea>
                    </div>
                    <button type="submit" className="review-rating-button">Submit</button>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default ReviewRating;
