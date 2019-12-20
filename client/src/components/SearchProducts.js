import React ,{Component} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import './searchProducts.css';
import queryString from 'query-string';
import * as actions from '../actions/searchActions';

let previousVal = 0;
const initialState = {
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
    }
}

class SearchProducts extends Component {

    constructor(props){
        super(props)
        this.state = {
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
            }
        }
    }

    topFunction = () => {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      }

    async componentDidMount(){
        await this.props.searchProducts(this.props.query, this.props.urlQuery)
        let {pageNum, sortField, sortOrder, categories} = this.props.filters;
        await this.setState({
            filters : {
                ...this.props.filters,
                pageNum : (pageNum) ? pageNum : 1,
                sortField : (sortField) ? sortField : 'customer_average_review_rating',
                sortOrder : (sortOrder) ? sortOrder : 'desc',
                categories : (typeof(categories) === 'string') ? [categories] : categories
            }
        })
        return;
    }

    newRequest = async(resetPaging=true, handleMobileToggle=true) => {
        let newUrlQuery = ``;
        let {categories,subCategories,brands, minPrice, maxPrice, minRating, pageNum, sortField, sortOrder} = this.state.filters;
        if(categories){
            await categories.forEach(option => {
                let category = option.split('&').join('%26');
                newUrlQuery+= `&categories=${category}`
            })
        }
        if(subCategories){
            await subCategories.forEach(option => {
                let subCategory = option.split('&').join('%26');
                newUrlQuery+= `&subCategories=${subCategory}`
            })
        }
        if(brands){
            await brands.forEach(option => {
                let brand = option.split('&').join('%26');
                newUrlQuery+= `&brands=${brand}`
            })
        }
        if(minPrice) newUrlQuery+= `&minPrice=${minPrice}`;
        if(maxPrice) newUrlQuery+= `&maxPrice=${maxPrice}`;
        if(minRating) newUrlQuery+= `&minRating=${minRating}`;
        if(sortField) newUrlQuery+= `&sortField=${sortField}`;
        if(sortOrder) newUrlQuery+= `&sortOrder=${sortOrder}`;
        if(!resetPaging) if(pageNum) newUrlQuery+= `&pageNum=${pageNum}`;
        if(resetPaging){
            await this.setState({
                filters  :{
                    ...this.state.filters,
                    pageNum  : 1
                }
            })
        }
        if(handleMobileToggle) this.handleMobileFiltersToggle();
        await this.props.searchProducts(this.props.query, `?${newUrlQuery}`);
        await this.props.history.push(`/search/titleSearch/${this.props.query}/?${newUrlQuery}`);
        this.topFunction()
        return;
    }

    handleChange = async (e) => {
        let filters = this.state.filters;
        if(filters[e.target.name]){
            if(filters[e.target.name].includes(e.target.value)){
                let newValues = filters[e.target.name].filter(val => {
                    if(val === e.target.value) return false;
                    else return true
                })
                await this.setState({
                    filters : {
                        ...filters,
                        [e.target.name] : newValues
                    }
                })
            }
            else {
                await this.setState({
                    filters : {
                        ...filters,
                        [e.target.name] : [...filters[e.target.name], e.target.value]
                    }
                })
            }
        } else {
            await this.setState({
                filters : {
                    ...filters,
                    [e.target.name] : [e.target.value]
                }
            })
        }
        // making new query and send to the server,  
        await this.newRequest()
        
        //changing the browser url
    }

    handlePriceChange = (e) => {
        this.setState({
            filters : {
                ...this.state.filters,
                [e.target.name] : e.target.value
            }
        })
    }

    handleRatingFilter = async  (e) => {
        await this.setState({
            filters : {
                ...this.state.filters,
                minRating : e.target.value
            }
        })
        this.newRequest()
    }

    jumpOptions =  () => {
        let maxPageLimit =  Math.trunc(this.props.totalResultCount / 20)+1;
        let options = [];
        for (let i=1; i<=maxPageLimit;i++){
            options.push(
                <option value={i}>{i}</option>
            )
        }
        if(options.length === maxPageLimit){
            return options
        }
    }

    handlePageTransition = async (mode,num=1) => {
        let pageNum;
        if(mode === 'prev') pageNum = parseInt(this.state.filters.pageNum) - 1;
        if(mode === 'next') pageNum = parseInt(this.state.filters.pageNum) + 1;
        if(mode === 'jump') pageNum = num;
        await this.setState({
            filters : {
                ...this.state.filters,
                pageNum : pageNum
            }
        })
        await this.newRequest(false, false);
        return;
    }

    changeSorting = (e) => {
        this.setState({
            filters : {
                ...this.state.filters,
                [e.target.name] : e.target.value
            }
        })
    }

    renderFilters = () => {
        const {relatedBrands, relatedCategories, relatedSubCategories} = this.props;
        let brandsOptions = relatedBrands.map(option => {
            if(option === '') return;
            let val = false;
            if(this.state.filters.brands){
                if(this.state.filters.brands.includes(option)) val = true
            }
            return (
            <label>
                {option}
                <input type='checkbox' checked={val}  name='brands' value={option} onChange={this.handleChange}/> 
            </label>
            )
        })
        let categoryOptions = relatedCategories.map(option => {
            if(option === '') return;
            let {categories} = this.state.filters;
            let val = false;
            if(categories){
                if(categories.includes(option)) val = true
            }
            return (
            <label>
                {option}
                <input type='checkbox' checked={val} name='categories' value={option} onChange={this.handleChange}/>
            </label>
            )
        })
        let subCategoryOptions = relatedSubCategories.map(option => {
            if(option === '') return;
            let {subCategories} = this.state.filters;
            let val = false
            if(subCategories){
                if(subCategories.includes(option)) val = true
            }
            return (
                <label>
                    {option}
                    <input type='checkbox' checked={val} name='subCategories' value={option} onChange={this.handleChange}/>
                </label>
            )
        })
        return(
            [
                <div className='searchFiltersSections'>
                    <div className='filterTitle'>
                        Category
                    </div>
                    <div className='filterOptions'>
                        {categoryOptions}
                    </div>
                </div>,
                <form className='searchFiltersSections' onSubmit={(e) => {
                    e.preventDefault();
                    this.newRequest()
                }}>
                    <label className='range'>
                        Minimun Price : {(this.state.filters.minPrice) ? `$${this.state.filters.minPrice}` : `Not Set`}
                        <input type='range'
                        onChange={this.handlePriceChange}
                        name='minPrice'
                        max={10000}
                        step={100}
                        value={(this.state.filters.minPrice) ? this.state.filters.minPrice : undefined}
                        />
                    </label>
                    <label className='range'>
                        Maximum Price : {(this.state.filters.maxPrice) ? `$${this.state.filters.maxPrice}` : `Not Set`}
                        <input type='range'
                        onChange={this.handlePriceChange}
                        name='maxPrice'
                        max={10000}
                        step={100}
                        value={(this.state.filters.maxPrice) ? this.state.filters.maxPrice : undefined}
                        />
                    </label>
                    <input
                    type='submit'
                    value='Go'
                    />
                </form>,
                <div className='searchFiltersSections'>
                    <h4>Minimum Rating : </h4>
                    <button className='starsRating' onClick={this.handleRatingFilter} value={4}>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="far fa-star"></i>
                    </button>
                    <button className='starsRating' onClick={this.handleRatingFilter} value={3}>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="far fa-star"></i>
                    <i class="far fa-star"></i>
                    </button>
                    <button className='starsRating' onClick={this.handleRatingFilter} value={2}>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="far fa-star"></i>
                    <i class="far fa-star"></i>
                    <i class="far fa-star"></i>
                    </button>
                    <button className='starsRating' onClick={this.handleRatingFilter} value={1}>
                    <i class="fas fa-star"></i>
                    <i class="far fa-star"></i>
                    <i class="far fa-star"></i>
                    <i class="far fa-star"></i>
                    <i class="far fa-star"></i>
                    </button>
                </div>,
                <div className='searchFiltersSections'>
                    <div className='filterTitle'>
                        Brand
                    </div>
                    <div className='filterOptions'>
                        {brandsOptions}
                    </div>
                </div>,
                <div className='searchFiltersSections'>
                    <div className='filterTitle'>
                        Sub Category
                    </div>
                    <div className='filterOptions'>
                        {subCategoryOptions}
                    </div>
                </div>
                
            ]
        )

    }

    handleMobileFiltersToggle = () => {
        let searchFilters = document.getElementsByClassName('searchFilters')[0];
        let searchProducts = document.getElementsByClassName('searchProducts')[0];
        if (searchFilters.id !== "mobile-none") searchFilters.id = "mobile-none";
        else searchFilters.id = "mobile-show";
        if (searchProducts.id !== "mobile-none") searchProducts.id = "mobile-none";
        else searchProducts.id = "mobile-show";
    }

    // handleMobileMainHeaderToggeling = (e) => {
    //     let mainHeader = document.getElementById('mainNavBar');
    //     let scrollTop = e.target.scrollTop || 0;
    //     if (scrollTop >= previousVal) {
    //         mainHeader.style.height = 0;
    //     }
    //     else {
    //         mainHeader.style.height = 'flex';
    //     }
    //     previousVal = scrollTop

    // }

    render() {
        if(this.props.products === null) return <div></div>
        if (this.props.products.length < 1){
            return (
                <div id='productNotFound'>
                    <h3>Currently , we dont have this Product</h3>
                    <img src="https://cdn.pixabay.com/photo/2018/12/31/17/06/sorry-3905517_960_720.png" alt="Sorry"/>
                </div>
            )
        }
        console.log(this.state)
        let products = this.props.products.map(p => {
            return (
                    <div className='products'>
                        <img src={p.imgSrc}></img>
                        <h3>{p.title}</h3>
                        <h3>${p.price}</h3>
                        <h3>{p.brand}</h3>
                        <h3>Rating : {p.customer_average_review_rating}</h3>
                        <Link to={`/shop/products/${p._id}`}>View Product</Link>
                    </div>
            )
        })
        
        let limitPerPage = 20;
        let {pageNum} = this.state.filters;
        let {totalResultCount} = this.props;
        let fromProduct = (((limitPerPage*(pageNum-1))+1) < totalResultCount) ? (limitPerPage*(pageNum-1))+1 : totalResultCount;
        let toProduct = ((limitPerPage*(pageNum)) < totalResultCount) ? limitPerPage*(pageNum) : totalResultCount;
        return (
            <div className='titleSearchPage'>
                <div className='titleSearchPageHeader'>
                    <div className='titleSearchResultCount'>
                        Showing {fromProduct} to {toProduct} of {totalResultCount} results
                    </div>
                    <form id='sortingForm' onSubmit={(e) => {
                        e.preventDefault();
                        this.newRequest()
                    }}>
                        <select value={this.state.filters.sortField}  onChange={this.changeSorting} name='sortField' defaultValue={this.state.filters.sortField}>
                            <option  value={'customer_average_review_rating'}>Rating</option>
                            <option value={'price'}>Price</option>
                        </select>
                        <select value={this.state.filters.sortOrder}  onChange={this.changeSorting} name='sortOrder' defaultValue={this.state.filters.sortOrder}>
                            <option   value="desc">Desc</option>
                            <option  value="asc">Asc</option>
                        </select>
                        <input type="submit" value='Sort'/>
                    </form>
                    <button onClick={this.handleMobileFiltersToggle} id='titleSeachPage-filtersToggle'>
                        <i class="fas fa-sliders-h"></i>
                    </button>
                </div>
                <div className='titleSearchPageWrapper'>
                    <div id='mobile-none' className='searchFilters'>
                        {this.renderFilters()}
                    </div> 
                    <div className='searchProducts' onScroll={this.handleMobileMainHeaderToggeling}>
                        {products}
                        <div className='paging'>
                        {pageNum < 2 ? (
                            <button id="disabledButton">Prev</button>
                            ) : (
                            <button onClick={() => this.handlePageTransition("prev")}>
                            Prev
                            </button>
                            )}
                            {/* <button onClick={() => this.handlePageTransition('prev')}>Prev</button> */}
                            <button onClick={() => this.handlePageTransition('next')}>Next</button>
                            <select 
                            name="jumpNum"
                            onChange={(e) => {
                                this.handlePageTransition('jump', e.target.value)
                            }}
                            type="number" 
                            max={this.props.totalResultCount} 
                            defaultValue={this.state.filters.pageNum}
                            min={1}
                            >
                            {this.jumpOptions()}
                            </select>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

const mapStoreToProps = (store) => ({
    products : store.search.title.products,
    relatedBrands : store.search.title.relatedBrands,
    relatedCategories : store.search.title.relatedCategories,
    relatedSubCategories : store.search.title.relatedSubCategories,
    totalResultCount : store.search.title.totalResultCount,
    filters : store.search.title.filters,
    user : store.auth
})
export default connect(mapStoreToProps, actions)(withRouter(SearchProducts));

