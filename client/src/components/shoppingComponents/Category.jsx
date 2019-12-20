import "./category.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import * as actions from "../../actions/searchActions";

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: {
        brand: "",
        minPrice: 1,
        maxPrice: 1000,
        subCategory: "",
        sortField: "customer_average_review_rating",
        sortOrder: "desc",
        pageNum: 1
      },
      filterMode: false,
      jumpForm: {
        num: 1
      }
    };
  }

  async componentDidMount() {
    await this.props.searchCategory(this.props.category, this.props.filters);
    let obj = this.props.options;
    if (obj) {
      this.setState({
        filters: {
          brand: obj.brand || "",
          subCategory: obj.subCategory || "",
          minPrice: obj.minPrice !== "undefined" ? obj.minPrice : 0,
          maxPrice: obj.maxPrice !== "undefined" ? obj.maxPrice : 10000,
          pageNum: obj.pageNum || 1,
          sortField:
            obj.sortField !== "undefined"
              ? obj.sortField
              : "customer_average_review_rating",
          sortOrder: obj.sortOrder !== "undefined" ? obj.sortOrder : "desc"
        }
      });
      return;
    }
  }

  handleChange = e => {
    console.log(e.target.value);
    console.log(e.target.name);
    this.setState({
      filters: {
        ...this.state.filters,
        [e.target.name]: e.target.value
      }
    });
  };

  topFunction = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  handleSubmit = async e => {
    e.preventDefault();
    let {
      subCategory,
      brand,
      minPrice,
      maxPrice,
      sortField,
      sortOrder
    } = this.state.filters;
    let encodedSubCategory = subCategory;
    let encodedBrand = brand;
    if (subCategory) {
      encodedSubCategory = subCategory.split("&").join("%26");
    }
    if (brand) {
      encodedBrand = brand.split("&").join("%26");
    }

    let filters = `subCategory=${encodedSubCategory ||
      undefined}&brand=${encodedBrand ||
      undefined}&minPrice=${minPrice}&maxPrice=${maxPrice}&sortField=${sortField}&sortOrder=${sortOrder}&pageNum=${1}`;
    this.state.filterMode = false;
    await this.props.searchCategory(this.props.category, filters);
    this.props.history.push(`/shop/category/${this.props.category}?${filters}`);
    this.topFunction();
    return;
  };

  toggleFilters = () => {
    this.setState({
      filterMode: !this.state.filterMode
    });
  };

  handleSorting = async e => {
    e.preventDefault();
    let category = this.props.category;
    let {
      subCategory,
      brand,
      minPrice,
      maxPrice,
      sortOrder,
      sortField
    } = this.state.filters;
    let encodedSubCategory = subCategory.split("&").join("%26");
    let encodedBrand = brand.split("&").join("%26");
    let filters = `pageNum=1&subCategory=${encodedSubCategory ||
      undefined}&brand=${encodedBrand ||
      undefined}&minPrice=${minPrice}&maxPrice=${maxPrice}&sortField=${sortField}&sortOrder=${sortOrder}`;
    await this.props.searchCategory(category, filters);
    this.props.history.push(`/shop/category/${category}?${filters}`);
    return;
  };

  handlePageTransition = async (mode = "", num) => {
    let category = this.props.category;
    let oldPageNum =
      this.props.options.pageNum === undefined
        ? 1
        : parseInt(this.props.options.pageNum);
    let {
      subCategory,
      brand,
      minPrice,
      maxPrice,
      sortOrder,
      sortField
    } = this.state.filters;
    let encodedSubCategory = subCategory.split("&").join("%26");
    let encodedBrand = brand.split("&").join("%26");
    let preFilters = `subCategory=${encodedSubCategory ||
      undefined}&brand=${encodedBrand ||
      undefined}&minPrice=${minPrice}&maxPrice=${maxPrice}&sortField=${sortField}&sortOrder=${sortOrder}`;
    let newPageNum;
    if (mode === "next") newPageNum = oldPageNum + 1;
    else if (mode === "prev") newPageNum = oldPageNum - 1;
    else if (mode === "jump") newPageNum = num;
    let filters = preFilters.concat(`&pageNum=${newPageNum}`);
    await this.props.searchCategory(category, filters);
    this.setState({
      filters: {
        ...this.state.filters,
        pageNum: newPageNum
      }
    });
    this.props.history.push(`/shop/category/${category}?${filters}`);
    this.topFunction();
    return;
  };

  sliceStrings = (str, limit) => {
    if (str.length > limit) {
      return `${str.slice(0, limit)} ...`;
    } else return str;
  };

  renderForm = () => {
    let subCategoryOptions = this.props.data.subCategories.map(subCategory => {
      return (
        <option value={subCategory}>
          {this.sliceStrings(subCategory, 25)}
        </option>
      );
    });
    let brandsOptions = this.props.data.brands.map(brand => {
      return <option value={brand}>{this.sliceStrings(brand, 30)}</option>;
    });
    return (
      <form onSubmit={this.handleSubmit} id="categoryFilters">
        <div id="closeButtonWrapper">
          <h3>Filter the Products:</h3>
          <button id="closeButton" onClick={this.toggleFilters}>
            X
          </button>
        </div>
        <label className="categoryFiltersLabels">
          <span>SubCategory:</span>
          <select
            value={this.state.filters.subCategory}
            defaultValue={this.state.filters.subCategory}
            name="subCategory"
            onChange={this.handleChange}
          >
            <option value={""}>Filter by SubCategory</option>
            {subCategoryOptions}
          </select>
        </label>
        <label className="categoryFiltersLabels">
          <span>Brand:</span>
          <select
            value={this.state.filters.brand}
            defaultValue={this.state.filters.brand}
            name="brand"
            onChange={this.handleChange}
          >
            <option value={""}>Filter by Brand</option>
            {brandsOptions}
          </select>
        </label>
        <label className="categoryFiltersLabels">
          <span>Minimum Price: ${this.state.filters.minPrice}</span>
          <input
            type="range"
            step={0.01}
            min={1}
            max={this.state.filters.maxPrice}
            name="minPrice"
            value={this.state.filters.minPrice}
            defaultValue={this.state.filters.minPrice}
            onChange={this.handleChange}
          />
        </label>
        <label className="categoryFiltersLabels">
          <span>Maximum Price: ${this.state.filters.maxPrice}</span>
          <input
            type="range"
            step={1}
            min={this.state.filters.minPrice}
            max={100000}
            name="maxPrice"
            defaultValue={this.state.filters.maxPrice}
            value={this.state.filters.maxPrice}
            onChange={this.handleChange}
          />
        </label>
        <div id="submitWrapper">
          <input type="submit" value="Filter" />
        </div>
      </form>
    );
  };

  jumpOptions = maxPageLimit => {
    let options = [];
    for (let i = 1; i <= maxPageLimit; i++) {
      options.push(<option value={i}>{i}</option>);
    }
    if (options.length === maxPageLimit) {
      return options;
    }
  };

  render() {
    let { products } = this.props.data;
    if (products === null) return <div></div>;
    let showProducts = products.map(p => {
      return (
        <div className="categoryProduct">
          <img src={p.imgSrc}></img>
          <h3>{p.title}</h3>
          <h3>${p.price}</h3>
          <h3>{p.brand}</h3>
          <h3>Rating : {p.customer_average_review_rating}</h3>
          <Link to={`/shop/products/${p._id}`}>View Product</Link>
        </div>
      );
    });
    let totalResultsCount = this.props.data.allResultsCount;
    let limitPerPage = 20;
    let pageNum = this.props.options.pageNum || 1;
    let fromProduct =
      limitPerPage * (pageNum - 1) + 1 < totalResultsCount
        ? limitPerPage * (pageNum - 1) + 1
        : totalResultsCount;
    let toProduct =
      limitPerPage * pageNum < totalResultsCount
        ? limitPerPage * pageNum
        : totalResultsCount;
    let totalNumberOfPages = Math.trunc(totalResultsCount / 20) + 1;
    // Showing Number count string variables
    let subCategoryString =
      this.props.options.subCategory === "undefined" ||
      this.props.options.subCategory === undefined
        ? ""
        : `in ${this.props.options.subCategory}`;
    let brandString =
      this.props.options.brand === "undefined" ||
      this.props.options.brand === undefined
        ? ""
        : `from ${this.props.options.brand}`;
    // **********************
    // let subCategory = (this.props.options.subCategory === 'undefined') ? 'all' : this.props.options.subCategory
    return (
      <div id="CategorySearch">
        <h2>{this.props.category} Products</h2>
        <div id="filterAndSortingHead">
          {this.state.filterMode ? (
            <div>{this.renderForm()}</div>
          ) : (
            <button onClick={this.toggleFilters}>Filters</button>
          )}
          <form id="sortingForm" onSubmit={this.handleSorting}>
            <select
              value={this.state.filters.sortField}
              onChange={this.handleChange}
              name="sortField"
              defaultValue={this.state.filters.sortField}
            >
              <option value={"price"}>Price</option>
              <option value={"customer_average_review_rating"}>Rating</option>
            </select>
            <select
              value={this.state.filters.sortOrder}
              onChange={this.handleChange}
              name="sortOrder"
              defaultValue={this.state.filters.sortOrder}
            >
              <option value="asc">Asc</option>
              <option value="desc">Desc</option>
            </select>
            <input type="submit" value="Sort" />
          </form>
        </div>
        <div class="categorySearchResultCount">
          Showing {fromProduct} to {toProduct} of {totalResultsCount} results
          for {this.props.category} Products {subCategoryString} {brandString}
        </div>
        <div className="products">{showProducts}</div>
        <div className="paging">
          <button onClick={() => this.handlePageTransition("next")}>
            Next
          </button>
          {pageNum < 2 ? (
            <button id="disabledButton">Prev</button>
          ) : (
            <button onClick={() => this.handlePageTransition("prev")}>
              Prev
            </button>
          )}
          <form
            id="jumpPageForm"
            onSubmit={e => {
              e.preventDefault();
              this.handlePageTransition("jump", this.state.jumpForm.num);
            }}
          >
            <select
              name="jumpNum"
              onChange={e => {
                this.setState({ jumpForm: { num: e.target.value } });
              }}
              type="number"
              max={totalNumberOfPages}
              defaultValue={this.props.options.pageNum}
              min={1}
            >
              {this.jumpOptions(totalNumberOfPages)}
            </select>
            <input type="submit" value="Jump" />
          </form>
        </div>
      </div>
    );
  }
}

const mapStoreToProps = store => ({
  data: store.search.category
});

export default connect(
  mapStoreToProps,
  actions
)(withRouter(Category));
