import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { Link } from "react-router-dom";

import './ProductInfo.css'

import { getProductDetails } from '../../Redux_Thunk/Actions/ProductActions'
import Spinner from '../../Loader/Spinner'
import ProductInfo_Body from './ProductInfo_body'

const ProductInfo = ({ match }) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSave = () => { console.log('Save action triggered') };
    const [ratings, setRatings] = useState(0);

    const { product, error, currentStatus, loading } = useSelector(state => state.productDetails);

    const ratingChanged = (newRating) => {
        console.log(newRating);
    };


    useEffect(() => {
        if (error) {
            return alert.error('Internal Server error');
        }
        dispatch(getProductDetails(match.params.id));
    }, [dispatch, alert, match.params.id])

    return (
        <div>
            {loading ? <Spinner /> : (
                <section className="product-details spad">
                    <div className="container">
                        {typeof product !== 'undefined' && product.success ?
                            <ProductInfo_Body
                                product={product.product}
                                show={show}
                                handleClose={handleClose}
                                handleSave={handleSave}
                                handleShow={handleShow}
                                ratingChanged={ratingChanged}
                            /> : (
                                <p>Opps some thing went Wrong</p>
                            )}
                    </div>
                </section>
            )}
        </div>
    )
}

export default ProductInfo
