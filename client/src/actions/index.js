import {FETCH_USER,
     FETCH_PRODUCTS,
     FLASH,
     UNFLASH
    } from './constants';
import axios from 'axios';

export const fetchUser = () => async (dispatch) => {
    await dispatch({
        type : FLASH,
        payload : null
    })
    let user = await axios.get('/api/currentUser');
    await dispatch({
        type : FETCH_USER,
        payload : user.data
    })
    dispatch({
        type : UNFLASH,
        payload : null
    })
}


export const setUserBadge = (badge, history) => async (dispatch) => {
    let response = await axios.post('/api/setUserBadge', {
        badge : badge
    })
    await dispatch({
        type : FETCH_USER,
        payload : response.data
    })
    history.push(`/${response.data.badge.toLowerCase()}`)
}




export const fetchProducts = () => async (dispatch) => {
    await dispatch({
        type : FLASH,
        payload : null
    })
    let products = await axios.get('/api/products');
    await dispatch({
        type : FETCH_PRODUCTS,
        payload : products.data
    })
    await dispatch({
        type : UNFLASH,
        payload : null
    })
}









