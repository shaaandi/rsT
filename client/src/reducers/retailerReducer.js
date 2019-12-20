import {LOAD_RETAILER,
     ADD_PRODUCT,
     EDIT_PRODUCT,
     DELETE_PRODUCT, 
     UPDATE_RETAILER,
     FETCH_RETAILER_PRODUCTS,
     FETCH_RETAILER_ORDERS,
     UPDATE_RETAILER_ORDERS
    } from '../actions/constants';

let initialState = {
    profile : null,
    products : null,
    orders : null,
}

export default  function (state = initialState, action) {
    let products;
    let orders;
    switch(action.type){
        case UPDATE_RETAILER:
            return {...state, profile : action.payload}
        case LOAD_RETAILER:
            return {...state, profile : action.payload}
        case FETCH_RETAILER_PRODUCTS:
            return {...state, products : action.payload}
        case FETCH_RETAILER_ORDERS:
            return {...state, orders : action.payload}
        case UPDATE_RETAILER_ORDERS:
            if(state.orders === null) return state
            orders = state.orders.map(o => {
                if (o._id === action.payload._id) return action.payload
                else return o
            })
            return {...state, orders}
        case ADD_PRODUCT:
            products = state.products;
            products.push(action.payload)
            return {...state, products}
        case EDIT_PRODUCT:
            products = state.products.map((p) => {
                if (p._id === action.payload._id) { 
                    return {...action.payload}
                }
                else {
                    return p
                }
            })
            return {...state, products}
        case DELETE_PRODUCT:
            products = state.products.filter(p => {
                if (p._id === action.payload.id) {
                    return 
                } else {
                    return p
                }
                
            })
            return {...state , products}
        default :
            return state
    }
}