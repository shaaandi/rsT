import {
     FLASH,
     UNFLASH,
     LOAD_SERVICE,
     UPDATE_SERVICE,
     FETCH_SERVICE_RETAILER_ORDERS,
     FETCH_SERVICE_CUSTOMER_ORDERS,
     FETCH_SERVICE_SERVICE_ORDERS
    } from './constants';

import axios from 'axios'
export const fetchService = () => async (dispatch) => {
    await dispatch({
        type : FLASH,
        payload : null
    })
    let service = await axios.get('/api/service')
    await dispatch({
        type : LOAD_SERVICE,
        payload : service.data
    })
    await dispatch({
        type : UNFLASH,
        payload : null
    })
}


export const updateService = (data) => async(dispatch) => {
    await dispatch({
        type : FLASH,
        payload : null
    })
    let user = await axios.post('/api/service', {
        name : data.name,
        address : data.address
    })
    await dispatch({
        type : UPDATE_SERVICE,
        payload : user.data
    })
    dispatch({
        type : UNFLASH,
        payload : null
    })
}


export const fetchServiceOrders = (mode) => async (dispatch) => {
    await dispatch({
        type : FLASH,
        payload : null
    })
    let serviceOrders = await axios.get(`/api/service/${mode}`)
    let type ;
    if (mode === 'retailerOrders') type = FETCH_SERVICE_RETAILER_ORDERS
    else if (mode === 'customerOrders') type = FETCH_SERVICE_CUSTOMER_ORDERS
    else if (mode === 'serviceOrders') type = FETCH_SERVICE_SERVICE_ORDERS
    await dispatch({
        type : type,
        payload : serviceOrders.data
    })
    dispatch({
        type : UNFLASH,
        payload : null
    });
    return
}

export const fetchServiceOrder = (orderId, mode) => async (dispatch) => {
    await dispatch({
        type : FLASH,
        payload : null
    })
    let response = await axios.get(`/api/service/${mode}/${orderId}`)
    dispatch({
        type : UNFLASH,
        payload : null
    })
    return response.data
}

export const deliveringProduct = (customerOrderId, setStatus) => async (dispatch) => {
    await dispatch({
        type : FLASH,
        payload : null
    })
    let customerOrder = await axios.post(`/api/service/customerOrders/${customerOrderId}`,{
        forward : false,
        recieverId : '',
        setStatus
    })
    await dispatch({
        type : UNFLASH,
        payload : null
    })
    if (customerOrder) return;
}

export const serviceRetailerOrderConfirmation = (orderId, forward, body={}) => async (dispatch) => {
    
    await dispatch({
        type : FLASH,
        payload : null
    })
    let recieverId;
    if (body.recieverId) recieverId = body.recieverId;
    else recieverId = ''
    let  updatedService = await axios.post(`/api/service/retailerOrders/${orderId}`,{
        forward : forward,
        recieverId : recieverId
    })
    await dispatch({
        type : LOAD_SERVICE,
        payload : updatedService.data
    })
    dispatch({
        type : UNFLASH,
        payload : null
    })
    return 
}

export const serviceServiceOrderConfirmation = (orderId, forward, body={}) => async (dispatch) => {
    
    await dispatch({
        type : FLASH,
        payload : null
    })
    let recieverId;
    if (body.recieverId) recieverId = body.recieverId;
    else recieverId = ''
    let  updatedService = await axios.post(`/api/service/serviceOrders/${orderId}`,{
        forward : forward,
        recieverId : recieverId
    })
    await dispatch({
        type : LOAD_SERVICE,
        payload : updatedService.data
    })
    dispatch({
        type : UNFLASH,
        payload : null
    })
    return 
}

