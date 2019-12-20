import axios from 'axios';
import {FLASH, UNFLASH} from './constants';

export const fetchProduct = (productId) => async (dispatch) => {
    await dispatch({
        type : FLASH,
        payload : null
    })
    let product = await axios.get(`/api/products/${productId}`)
    await dispatch({
        type : UNFLASH,
        payload : null
    })
    return product.data
}
