import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../Redux_Thunk/Actions/ProductActions'
import ProductItem from './ProductItem'
import Spinner from '../../Loader/Spinner'

const ProductsPage = () => {
    const dispatch = useDispatch();

    const { loading, products, error, productsCount } = useSelector(state => state.products);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch, error])

    return (
        <React.Fragment>
            {loading ? <Spinner /> : (
                <section className="product_section layout_padding">
                    <div className="container">
                        <div className="heading_container heading_center">
                            <h2>Our Products</h2>
                        </div>
                        <div className="row">
                            {products && products.map(product => (
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
