import React from 'react'

const DisplayRatings = ({ ratings, reviews = 0, reviewRequired = true }) => {
    var elements = [];

    for (var i = 1; i <= 5; i++) {
        if (i < ratings) {
            elements.push(<i key={i} className="fa fa-star" aria-hidden="true" style={{ color: "#f2b01e" }}></i>);
        }
        else {
            let value = Number((i - ratings));
            if (value > 0 && value < 1) {
                elements.push(<i key={i} className="fa fa-star-half-o" style={{ color: "#f2b01e" }} aria-hidden="true" ></i>);
            }
            else {
                elements.push(<i key={i} className="fa fa-star-o" aria-hidden="true" style={{ color: "#f2b01e" }}></i>);
            }
        }
    }
    if (reviewRequired) {
        elements.push(<span key={i + 1}> ({reviews || 0} Reviews) </span>);
    }
    return (
        <p>
            { elements}
        </p>
    )
}

export default DisplayRatings;


