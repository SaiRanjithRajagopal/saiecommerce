import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import { Link } from "react-router-dom";

import './ProductInfo.css'

import DisplayRatings from '../../Ratings/DisplayRatings'
import Bootstrap_Modal from '../../Modal/Bootstrap_Modal'
import AddRatings from '../../Ratings/AddRatings'

const ProductInfo_body = ({ product, show, handleClose, handleSave, handleShow, ratingChanged }) => {

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
                        <p className="productId_FontSize">Product Id: {product._id}</p>
                        <div className="product__details__rating">
                            <DisplayRatings ratings={product.ratings} reviews={product.numofReviews} />
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
                            <Link to="/" type="button" className="btn btn-warning">Add to Cart</Link>
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
                    <br />
                    <div className="row">
                        <div className="col" className="text-center">
                            <button type="button" className="btn btn-warning" onClick={handleShow}>Add Ratings</button>
                            <Bootstrap_Modal
                                show={show}
                                handleClose={handleClose}
                                handleSave={handleSave}>
                                <AddRatings ratingChanged={ratingChanged} />
                            </Bootstrap_Modal>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ProductInfo_body
