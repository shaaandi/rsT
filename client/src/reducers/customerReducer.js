import { LOAD_CUSTOMER, UPDATE_CUSTOMER,
     REMOVE_PRODUCT_FROM_WISHLIST, REMOVE_PRODUCT_FROM_CART,
      CART_QUANTITY_SETTER, FETCH_CUSTOMER_SECTION } from "../actions/constants";

const initialState = {
    profile  : null,
    wishList : null,
    cart  : {
        products : null,
        cartQuantity  :null
    },
    customerOrders : null
}

export default function (state=initialState, action) {
    switch(action.type) {
        case LOAD_CUSTOMER:
            return {...state, profile : action.payload}
        case UPDATE_CUSTOMER:
            return {...state, profile : action.payload}
        case FETCH_CUSTOMER_SECTION:
            return {...state, [action.payload.section] : action.payload.data}
        case REMOVE_PRODUCT_FROM_WISHLIST:
            let wishList = state.wishList.filter(p => {
                if (p._id === action.payload) return;
                else return p
            })
            return {...state, wishList}
        case REMOVE_PRODUCT_FROM_CART:
            let products = state.cart.products.filter(p => {
                if (p._id === action.payload) return;
                else return p
            })
            delete state.cart.cartQuantity[action.payload]
            return {...state, cart :  {...state.cart, products}}
        case CART_QUANTITY_SETTER:
            if(action.payload.mode === 'inc') state.cart.cartQuantity[action.payload.id]++
            if(action.payload.mode === 'dec') {
                if(state.cart.cartQuantity[action.payload.id] > 1) state.cart.cartQuantity[action.payload.id]--
            }
            return {...state}
        default :
            return state;
    }
}