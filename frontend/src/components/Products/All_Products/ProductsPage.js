import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import Pagination from 'react-js-pagination'
import Slider from 'rc-slider'

import 'rc-slider/assets/index.css';

import { getProducts } from '../../Redux_Thunk/Actions/ProductActions'
import ProductItem from '../Individual_Product/ProductItem'
import Spinner from '../../Loader/Spinner'

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const ProductsPage = ({ match }) => {

    const keyword = match.params.keyword;

    const dispatch = useDispatch();
    const alert = useAlert();

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([1, 1000]);
    const [category, setCategory] = useState('');

    const { loading, products, success, productsCount, resultsPerPage } = useSelector(state => state.products);

    useEffect(() => {

        if (products.success == false) {
            return alert.error('Internal Server error');
        }

        dispatch(getProducts(keyword, currentPage, price));

    }, [dispatch, alert, products.success, keyword, currentPage, price]);

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
                                {keyword ? (
                                    <React.Fragment>
                                        <div className="col-6 col-md-3 mt-5 mb-5">
                                            <div className="px-5">
                                                <Range
                                                    marks={{
                                                        1: `$1`,
                                                        1000: `$1000`
                                                    }}
                                                    min={1}
                                                    max={1000}
                                                    defaultValue={[1, 1000]}
                                                    tipFormatter={value => `$${value}`}
                                                    tipProps={{ placement: "top", visible: true }}
                                                    value={price}
                                                    onChange={price => setPrice(price)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-6 col-md-9">
                                            <div className="row">
                                                {
                                                    Array.isArray(products) && products.map(product => (
                                                        <ProductItem key={product._id} product={product} />
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </React.Fragment>

                                ) : (
                                    Array.isArray(products) && products.map(product => (
                                        <ProductItem key={product._id} product={product} />
                                    )))}
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
