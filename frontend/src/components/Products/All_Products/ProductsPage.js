import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';

import { getProducts } from '../../Redux_Thunk/Actions/ProductActions'
import ProductItem from './ProductItem'
import Spinner from '../../Loader/Spinner'


const ProductsPage = () => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { loading, products, success, productsCount } = useSelector(state => state.products);

    useEffect(() => {
        if (products.success == false) {
            return alert.error('Internal Server error');
        }
        dispatch(getProducts());
    }, [dispatch, alert, products.success])

    return (
        <React.Fragment>
            {loading ? <Spinner /> : (
                <section className="product_section layout_padding">
                    <div className="container">
                        <div className="heading_container heading_center">
                            <h2>Our Products</h2>
                        </div>
                        <div className="row">
                            {Array.isArray(products) && products.map(product => (
                                <ProductItem key={product._id} product={product} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </React.Fragment>
    )
}

export default ProductsPage
