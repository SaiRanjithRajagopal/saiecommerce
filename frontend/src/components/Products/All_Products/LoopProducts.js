import React from 'react'
import ProductItem from '../Individual_Product/ProductItem';

const LoopProducts = ({ products }) => {
    return (
        <React.Fragment>
            {
                Array.isArray(products) && products.map(product => (
                    <ProductItem key={product._id} product={product} />
                ))
            }
        </React.Fragment>
    )
}

export default LoopProducts
