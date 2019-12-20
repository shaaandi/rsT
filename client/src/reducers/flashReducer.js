import { FLASH, UNFLASH } from "../actions/constants";

const initialState = {
    loading : true,
}
export default function (state=initialState, action) {
    switch(action.type){
        case FLASH:
            return {...state, loading : true}
        case UNFLASH:
            return {...state, loading : false}
        default:
            return state;
    }
}