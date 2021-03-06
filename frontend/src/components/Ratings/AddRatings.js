import React from 'react'
import ReactStars from "react-rating-stars-component";

const AddRatings = ({ ratingChanged }) => {
    return (
        <>
            <h2>Rating from state</h2>
            <ReactStars
                count={5}
                onChange={ratingChanged}
                size={24}
                isHalf={true}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#ffd700"
            />
        </>
    )
}

export default AddRatings
