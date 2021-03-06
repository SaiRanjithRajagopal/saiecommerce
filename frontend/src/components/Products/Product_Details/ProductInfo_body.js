import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import { Link } from "react-router-dom";
import Ratings from '../All_Products/Ratings'
import './ProductInfo.css'

const ProductInfo_body = ({ product }) => {
    return (
        <React.Fragment>
            <div className="row">
                <div className="col">
                    <div className="product__details__pic">
                        <div>
                            <Carousel >
                                {
                                    product.images && product.images.map(image => (
                                        <Carousel.Item interval={1000} key={image.public_id}>
                                            <img className="d-block w-50" src={image.url} alt="" />
                                        </Carousel.Item>
                                    ))
                                }
                            </Carousel>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="product__details__text">
                        <h3 className="h1">{product.name}</h3>
                        <p style={{ 'font-size': 13 }}>Product Id: {product._id}</p>
                        <div className="product__details__rating">
                            <Ratings ratings={product.ratings} reviews={product.numofReviews} />
                        </div>
                        <div className="product__details__price">${product.price}</div>
                        <p>{product.description}</p>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="row">
                                <div className="col">
                                    <button className="btn btn-danger">-</button>
                                </div>
                                <div className="col">
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="col">
                                    <button className="btn btn-primary">+</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-5">
                        </div>
                        <div className="col">
                            <Link to="/" type="button" className="btn btn-warning">ADD TO CARD</Link>
                        </div>
                    </div>
                    <div className="product__details__text">
                        <ul>
                            <li><b>Seller Name</b><span>{product.seller}</span></li>
                            <li><b>Availability</b><span className={product.stock > 0 ? 'greenColor' : 'redColor'}>{product.stock > 0 ? 'In Stock' : 'Out of stock'}</span></li>
                            <li>< b > Shipping</b> <span>01 day shipping. <samp>Free pickup today</samp></span></li>
                            <li><b>Share on</b>
                                <div className="share">
                                    <Link to="/"><i className="fa fa-facebook"></i></Link>
                                    <Link to="/"><i className="fa fa-twitter"></i></Link>
                                    <Link to="/"><i className="fa fa-instagram"></i></Link>
                                    <Link to="/"><i className="fa fa-pinterest"></i></Link>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ProductInfo_body
