import { LOAD_SERVICE, UPDATE_SERVICE, FETCH_SERVICE, FETCH_SERVICE_RETAILER_ORDERS, FETCH_SERVICE_CUSTOMER_ORDERS, FETCH_SERVICE_SERVICE_ORDERS } from "../actions/constants";
const initialState = {
    profile : null,
    customerOrders : null,
    retailerOrders : null,
    serviceOrders : null
}

export default function (state=initialState, action) {
    switch(action.type) {
        case LOAD_SERVICE:
            return {...state, profile : action.payload.profile };
        case UPDATE_SERVICE:
            return {...state, profile : action.payload};
        case FETCH_SERVICE_RETAILER_ORDERS:
            return {...state, retailerOrders: action.payload}
        case FETCH_SERVICE_CUSTOMER_ORDERS:
            return {...state, customerOrders : action.payload}
        case FETCH_SERVICE_SERVICE_ORDERS:
            return {...state, serviceOrders : action.payload}
        default :
            return state;
    }
}