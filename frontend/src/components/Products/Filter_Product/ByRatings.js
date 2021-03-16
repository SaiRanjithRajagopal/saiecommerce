import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';

import DisplayRating from '../../Ratings/DisplayRatings';

const ByRatings = ({ rating, setRating }) => {
    return (
        <React.Fragment>
            <h4>Ratings</h4>
            {
                <ListGroup>
                    {[6, 5, 4, 3, 2, 1].map(star => (
                        <ListGroup.Item as="li"
                            className={star == rating ? 'active onMouseHover' : 'onMouseHover'}
                            key={star}
                            onClick={() => setRating(star)}
                        ><DisplayRating ratings={star} reviewRequired={false} /></ListGroup.Item>
                    ))}
                </ListGroup>
            }
        </React.Fragment>
    )
}

export default ByRatings
