import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails } from '../../Redux_Thunk/Actions/ProductActions'
import Spinner from '../../Loader/Spinner'
import { useAlert } from 'react-alert';

const ProductInfo = () => {

    const dispatch = useDispatch();
    const alert = useAlert();

    return (
        <div>

        </div>
    )
}

export default ProductInfo
