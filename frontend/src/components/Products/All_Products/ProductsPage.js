import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import Pagination from 'react-js-pagination'
import Slider from 'rc-slider'
import ListGroup from 'react-bootstrap/ListGroup'

import 'rc-slider/assets/index.css';
import './ProdcutsPage.css'

import { getProducts } from '../../Redux_Thunk/Actions/ProductActions'
import ProductItem from '../Individual_Product/ProductItem'
import Spinner from '../../Loader/Spinner'
import DisplayRating from '../../Ratings/DisplayRatings'

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const ProductsPage = ({ match }) => {

    const categories = ['All', 'Electronics', 'Cameras', 'Laptop', 'Accessories', 'Headphones', 'Food', 'Books', 'Clothes/Shoes', 'Beauty/Health', 'Sports', 'Outdoor', 'Home', 'Softwares'];
    const keyword = match.params.keyword;

    const dispatch = useDispatch();
    const alert = useAlert();

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([1, 1000]);
    const [category, setCategory] = useState('');
    const [rating, setRating] = useState(0);

    const { loading, products, success, productsCount, resultsPerPage, filteredProductsCount } = useSelector(state => state.products);

    useEffect(() => {

        if (products.success == false) {
            return alert.error('Internal Server error');
        }

        dispatch(getProducts(keyword, currentPage, price, category, rating));

    }, [dispatch, alert, products.success, keyword, currentPage, price, category, rating]);

    const setCurrentPageNo = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    let count = productsCount;
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
                                                <br />
                                                <br />
                                                <br />
                                                <hr />
                                                <h4>Categories</h4>
                                                <ListGroup as="ui">
                                                    {categories.map(currentCategory => (
                                                        <ListGroup.Item as="li" className={(currentCategory == 'All' && category == '') ? 'active' : (currentCategory == category ? 'active onMouseHover' : 'onMouseHover')}
                                                            key={currentCategory}
                                                            onClick={() => {
                                                                if (currentCategory == 'All') { setCategory('') } else { setCategory(currentCategory) }
                                                            }}
                                                        >{currentCategory}</ListGroup.Item>
                                                    ))}
                                                </ListGroup>
                                                <br />
                                                <br />
                                                <br />
                                                <hr />
                                                <h4>Ratings</h4>
                                                {
                                                    <ListGroup as="ui">
                                                        {[6, 5, 4, 3, 2, 1].map(star => (
                                                            <ListGroup.Item as="li"
                                                                className={star == rating ? 'active onMouseHover' : 'onMouseHover'}
                                                                key={star}
                                                                onClick={() => setRating(star)}
                                                            >< DisplayRating ratings={star} reviewRequired={false} /></ListGroup.Item>
                                                        ))}
                                                    </ListGroup>
                                                }

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
