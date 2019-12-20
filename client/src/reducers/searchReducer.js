import { SEARCH_PRODUCTS, SEARCH_CATEGORY } from "../actions/constants";

const initialState = {
    title : {
        products : null,
        filters : {
            categories : null,
            subCategories :null,
            brands : null,
            minPrice : null,
            maxPrice : null,
            minRating : null,
            pageNum : 1,
            sortField : null,
            sortOrder : null
        },
        relatedBrands : null,
        relatedCategories : null,
        relatedSubCategories : null,
        totalResultCount : null
    },
    category : {
        products : null,
        filters  : {
            brand : null,
            minPrice : null,
            maxPrice : null,
            subCategory : null
        },
        brands : null,
        subCategories : null,
        allResultsCount : 0
    }
}

export default function (state=initialState,action){
    switch(action.type){
        case SEARCH_PRODUCTS:
            return {...state, title : action.payload}
        case SEARCH_CATEGORY:
            return {...state, category : action.payload}
        default: 
            return state
        
    }
}