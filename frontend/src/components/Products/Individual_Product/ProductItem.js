import React from 'react'
import { Link } from "react-router-dom";

import DisplayRatings from '../../Ratings/DisplayRatings'


const ProductItem = ({ product }) => {
    return (
        <React.Fragment>
            <div key={product._id} className="col-sm-6 col-lg-4">
                <div className="box">
                    <div className="img-box">
                        <img src={product.images[0].url} alt="" />
                    </div>
                    <div className="detail-box">
                        <h5>{product.name}</h5>
                        <div className="product_info">
                            <h5><span>$</span>{product.price}</h5>
                            <div className="star_container">
                                <DisplayRatings ratings={product.ratings} reviews={product.numofReviews} />
                            </div>
                        </div>
                    </div>
                    <table>
                        <tbody>
                            <tr>
                                <td><Link to={`/ProductInfo/${product._id}`} type="button" className="btn btn-danger">View Details</Link></td>
                                <td style={{ width: 40 }}></td>
                                <td><Link to="/" type="button" className="btn btn-warning">Add To Cart</Link></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </React.Fragment >
    )
}

export default ProductItem;
