import React, {Component} from 'react';
import { Route} from 'react-router-dom';
import queryString from 'query-string';
import Product from './Product';
import Category from './Category.jsx';
class shoppingDashboard extends Component {

    render() {
        return([
            <Route 
            exact path='/shop/products/:productId'
            render={({match}) => {
                return(
                    <Product id={match.params.productId}/>
                )
            }}
            />,
            <Route 
            path='/shop/category/:category'
            render={ ({match, location}) => {
            let options = queryString.parse(location.search)
            let {subCategory, brand, minPrice, maxPrice,pageNum,sortField, sortOrder } = options;
            let encodedSubCategory = (subCategory) ? subCategory.split('&').join('%26') : subCategory
            let encodedBrand = (brand) ? brand.split('&').join('%26') : brand;
            let filters = `subCategory=${encodedSubCategory}&brand=${encodedBrand}&minPrice=${minPrice}&maxPrice=${maxPrice}&sortField=${sortField}&sortOrder=${sortOrder}&pageNum=${pageNum}`;
            return(
                <Category
                category={match.params.category}
                filters={filters}
                options={options}
                />
            )
            }}
            />
        ])
    }
}


export default shoppingDashboard
