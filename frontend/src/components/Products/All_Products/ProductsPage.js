import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import Pagination from 'react-js-pagination';
import ListGroup from 'react-bootstrap/ListGroup';

import 'rc-slider/assets/index.css';
import './ProdcutsPage.css';

import { getProducts } from '../../Redux_Thunk/Actions/ProductActions';
import Spinner from '../../Loader/Spinner';
import BySlider from '../Filter_Product/BySlider';
import ByCategory from '../Filter_Product/ByCategory';
import ByRatings from '../Filter_Product/ByRatings'
import LoopProducts from './LoopProducts'

const ProductsPage = ({ match }) => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([1, 1000]);
    const [category, setCategory] = useState('');
    const [rating, setRating] = useState(0);
    const { loading, products, success, productsCount, resultsPerPage, filteredProductsCount } = useSelector(state => state.products);

    const categories = ['All', 'Electronics', 'Cameras', 'Laptop', 'Accessories', 'Headphones', 'Food', 'Books', 'Clothes/Shoes', 'Beauty/Health', 'Sports', 'Outdoor', 'Home', 'Softwares'];
    let count = productsCount;
    const keyword = match.params.keyword;


    useEffect(() => {
        if (products.success == false) {
            return alert.error('Internal Server error');
        }
        dispatch(getProducts(keyword, currentPage, price, category, rating));
    }, [dispatch, alert, products.success, keyword, currentPage, price, category, rating]);


    const setCurrentPageNo = (pageNumber) => {
        setCurrentPage(pageNumber);
    }


    if (keyword) {
        count = filteredProductsCount;
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
                                {keyword ? ( //This content will be displayed only when the user search for records
                                    <React.Fragment>
                                        <div className="col-6 col-md-3 mt-5 mb-5">
                                            <div className="px-5">
                                                <BySlider price={price} setPrice={setPrice} />
                                                <ByCategory categories={categories} category={category} setCategory={setCategory} />
                                                <ByRatings rating={rating} setRating={setRating} />
                                            </div>
                                        </div>
                                        <div className="col-6 col-md-9">
                                            <div className="row">
                                                <LoopProducts products={products} />
                                            </div>
                                        </div>
                                    </React.Fragment>
                                ) : (<LoopProducts products={products} />)}
                            </div>
                        </div>
                    </section> //Pagination
                    {resultsPerPage < count && (
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
            )
            }
        </React.Fragment >
    )
}

export default ProductsPage
