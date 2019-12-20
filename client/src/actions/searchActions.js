import { FLASH, UNFLASH, SEARCH_PRODUCTS, SEARCH_CATEGORY } from "./constants";
import queryString from 'query-string';
import axios from "axios";


export const searchProducts = (query, filter='') => async (dispatch) => {
    dispatch({
        type : FLASH,
        payload : null
    })

    let response = await axios.get(`/api/search/product/titleSearch/${query}${filter}`)
    // let options = queryString.parse(filter);
    // let {categories,subCategories, pageNum, sortField, sortOrder,brands, minPrice, maxPrice, minRating} = options
    // let filters = {
    //     categories  : categories ? categories : null,
    //     subCategories : subCategories ? subCategories : null,
    //     pageNum : pageNum ? pageNum : 1,
    //     sortField : sortField ? sortField : 'customer-average-review-rating',
    //     sortOrder : sortOrder ? sortOrder : 'desc',
    //     brands : brands ? brands : null,
    //     minPrice : minPrice ? minPrice : null,
    //     maxPrice : maxPrice ? maxPrice  : null ,
    //     minRating : minRating ? minRating : null
    // }
    console.log(filter)
    let filters = queryString.parse(filter)
    console.log(filters)
    let dispatchData  = {
        ...response.data,
        filters
    }
    await dispatch({
        type : SEARCH_PRODUCTS,
        payload : dispatchData
    })
    await dispatch({
        type : UNFLASH,
        payload : null
    })
    return;
}

export const searchCategory = (category, filters) => async (dispatch) => {
    // filter is a string , with a specific pattern ,, it wil get parsed both in back and front end;
    dispatch({
        type : FLASH,
        payload : null
    })
    let response = await axios.get(`/api/search/category/${category}?${filters}`)
    let obj = queryString.parse(filters)
    await dispatch({
        type : SEARCH_CATEGORY,
        payload : {
            products : response.data.products,
            filters : obj,
            subCategories : response.data.subCategories,
            brands : response.data.brands,
            allResultsCount : response.data.allResultsCount
        }
    })
    await dispatch({
        type : UNFLASH,
        payload : null
    })
    return;
}