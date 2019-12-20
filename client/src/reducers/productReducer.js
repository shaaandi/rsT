import { FETCH_PRODUCTS } from "../actions/constants";


export default function (state=null, action) {
    switch(action.type){
        case FETCH_PRODUCTS:
            return action.payload;
        default:
            return state;
    }
}