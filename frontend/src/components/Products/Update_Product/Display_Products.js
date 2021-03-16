import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';

import './displayProductPage.css'

import { getProducts } from '../../Redux_Thunk/Actions/ProductActions';
import Spinner from '../../Loader/Spinner';
import { PRODUCT_DETAILS_FAIL } from '../../../constants/ProductConstants';

const Display_Products = () => {



    const dispatch = useDispatch();
    const { loading, products, success } = useSelector(state => state.products);
    const columns = [{
        dataField: 'name',
        text: 'Product Name',
        sort: true
    }, {
        dataField: 'category',
        text: 'Product Category',
        sort: true
    }, {
        dataField: 'price',
        text: 'Product Price',
        sort: true
    }, {
        dataField: 'seller',
        text: 'Product Seller',
        sort: true
    }];

    useEffect(() => {
        if (products.success == false) {
            return alert.error('Internal Server error');
        }
        dispatch(getProducts());
    }, [dispatch, alert, products.success]);

    const expandRow = {
        onlyOneExpanding: true,
        renderer: row => (
            <div>
                <p key={`${row.id}`}>{`${row.description}`}</p>
            </div>
        )
    };

    return (
        <React.Fragment>
            {loading ? <Spinner /> : (
                <>
                    <h1 className="productTable">Product Page</h1>
                    <div className="container">
                        <BootstrapTable
                            keyField='_id'
                            data={products}
                            columns={columns}
                            expandRow={expandRow}
                        />
                    </div>
                </>
            )}
        </React.Fragment>
    )
}

export default Display_Products;
