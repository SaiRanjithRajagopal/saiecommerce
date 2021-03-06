import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import Pagination from 'react-js-pagination'

import { getProducts } from '../../Redux_Thunk/Actions/ProductActions'
import ProductItem from '../Individual_Product/ProductItem'
import Spinner from '../../Loader/Spinner'


const ProductsPage = () => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const [currentPage, setCurrentPage] = useState(1);
    const { loading, products, success, productsCount, resultsPerPage } = useSelector(state => state.products);

    useEffect(() => {
        if (products.success == false) {
            return alert.error('Internal Server error');
        }
        dispatch(getProducts(currentPage));
    }, [dispatch, alert, products.success, currentPage]);

    const setCurrentPageNo = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    return (
        <React.Fragment>
            {loading ? <Spinner /> : (
                <div>
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

                    {resultsPerPage < productsCount && (
                        <div className="d-flex justify-content-center mt-5">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resultsPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrentPageNo}
                                nextPageText={'Next'}
                                prevPageText={'Prev'}
                                firstPageText={'First'}
                                lastPageText={'Last'}
                                itemClass="page-item"
                                linkClass="page-link"
                            />
                        </div>
                    )}
                </div>
            )}
        </React.Fragment>
    )
}

export default ProductsPage
