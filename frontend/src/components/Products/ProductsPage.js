import React from 'react'
import { Link } from "react-router-dom";

const ProductsPage = () => {
    return (
        <React.Fragment>
            <section className="product_section layout_padding">
                <div className="container">
                    <div className="heading_container heading_center">
                        <h2>Our Products</h2>
                    </div>
                    <div className="row">
                        <div className="col-sm-6 col-lg-4">
                            <div className="box">
                                <div className="img-box">
                                    <img src="images/p1.png" alt="" />
                                    <Link className="add_cart_btn" to="/">
                                        <span>Add To Cart</span>
                                    </Link>
                                </div>
                                <div className="detail-box">
                                    <h5>Product Name</h5>
                                    <div className="product_info">
                                        <h5><span>$</span> 300</h5>
                                        <div className="star_container">
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                        </div>
                                    </div>
                                </div>
                                <button type="button" className="btn btn-outline-danger lg">View Details</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

export default ProductsPage
