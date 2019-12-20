import React, { Component } from "react";
import { connect } from "react-redux";
import { searchProducts } from "../actions/searchActions";
import { Link, withRouter } from "react-router-dom";
import "./header.css";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        query: "",
        category: ""
      }
    };
  }

  searchAndOptionsToggleHandle = () => {
    let plus = document.getElementById("toggler-toggleOptions");
    let str = plus.style.transform.slice(7, 9)
      ? plus.style.transform.slice(7, 9)
      : "0";
    let prev = parseInt(str);
    let readyVal = prev === 13 ? 45 : prev;
    let options = document.getElementsByClassName("toggleOptions")[0];
    plus.style.transform = `rotate(${readyVal + 45}deg)`;
    if (options.id !== "mobile-none") options.id = "mobile-none";
    else options.id = "mobile-show";
  };

  handleChange = e => {
    this.setState({
      ...this.state,
      form: { ...this.state.form, [e.target.name]: e.target.value }
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    let { query, category } = this.state.form;
    let urlString = ``;
    if (category) {
      let parse = category.split("&").join("%26");
      urlString += `&categories=${parse}`;
    }
    // debugger;
    let forwardRoute = {
      pathname: `/search/titleSearch/${query}`,
      search: `?${urlString}`
    };
    this.setState({
      form: {
        query: "",
        category: ""
      }
    });
    this.props.history.push({
      pathname: `/empty`,
      state: {
        forwardRoute
      }
    });
  };

  renderForm() {
    return (
      <form
        className="headerForm-mobile headerForm"
        onSubmit={this.handleSubmit}
      >
        <select
          id="search-dropDown"
          onChange={this.handleChange}
          name="category"
          defaultValue=""
          value={this.state.form.category}
        >
          <option value={``}>Search In</option>
          <option value={`Automotive`}>Automotive</option>
          <option value={`Baby`}>Baby</option>
          <option value={`Home Improvement`}>Home Improvement</option>
          <option value={`Industrial Scientific`}>Industrial Scientific</option>
          <option value={`Lawn and Garden`}>Lawn and Garden</option>
          <option value={`Outdoor`}>Outdoor</option>
          <option value={`Pet Products`}>Pet Products</option>
          <option value={`Sports`}>Sports</option>
          <option value={`Toys`}>Toys</option>
        </select>
        <input
          type="text"
          id="query"
          onChange={this.handleChange}
          name="query"
          value={this.state.form.query}
        />
        <button id="searchIcon">
          <i class="fas fa-search"></i>
        </button>
      </form>
    );
  }

  toCategoryPage = async category => {
    let parse = category.split("&").join("%26");
    let forwardRoute = {
      pathname: `/shop/category/${parse}`,
      search: ""
    };
    this.props.history.push({
      pathname: `/empty`,
      state: {
        forwardRoute
      }
    });
  };

  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <a className="link" href="/auth/google">
            Login with Google
          </a>
        );
      default:
        let user = this.props.auth.badge.toLowerCase();
        switch (user) {
          case "customer":
            return [
              <Link to={`/customer/cart`} className="toggleOptions-buttons">
                <i class="fas fa-shopping-cart"></i>
              </Link>,
              <Link
                to={`/customer/customerOrders`}
                className="toggleOptions-buttons"
              >
                Orders
              </Link>,
              <div className="toggleOptions-dropDownWrapper">
                {/* <Link to={`/customer`} className="toggleOptions-dropDownButton">
                  <i class="fas fa-user"></i>
                </Link> */}
                <div className="toggleOptions-dropDownContent">
                  <Link
                    to="/customer/profile"
                    className="toggleOptions-dropDownOption"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/customer/wishlist"
                    className="toggleOptions-dropDownOption"
                  >
                    WishList
                  </Link>
                  <button className="toggleOptions-dropDownOption">
                    <a href="/api/logout">LogOut</a>
                  </button>
                </div>
              </div>
            ];
          case "retailer":
            return [
              <Link to="/retailer/orders" className="toggleOptions-buttons">
                Orders
              </Link>,
              <div className="toggleOptions-dropDownWrapper">
                {/* <Link to="/retailer" className="toggleOptions-dropDownButton">
                  <i class="fas fa-user"></i>
                </Link> */}
                <div className="toggleOptions-dropDownContent">
                  <Link
                    to="/retailer/profile"
                    className="toggleOptions-dropDownOption"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/retailer/products"
                    className="toggleOptions-dropDownOption"
                  >
                    Inventory
                  </Link>
                  <button className="toggleOptions-dropDownOption">
                    <a href="/api/logout">LogOut</a>
                  </button>
                </div>
              </div>
            ];
          case "service":
            return [
              <div className="toggleOptions-dropDownWrapper">
                <button className="toggleOptions-dropDownButton">Orders</button>
                <div className="toggleOptions-dropDownContent">
                  <Link
                    to="/service/customerOrders"
                    className="toggleOptions-dropDownOption"
                  >
                    C.Orders
                  </Link>
                  <Link
                    to="/service/retailerOrders"
                    className="toggleOptions-dropDownOption"
                  >
                    R.Orders
                  </Link>
                  <Link
                    to="/service/serviceOrders"
                    className="toggleOptions-dropDownOption"
                  >
                    S.Orders
                  </Link>
                </div>
              </div>,
              <div className="toggleOptions-dropDownWrapper">
                <Link to="/service" className="toggleOptions-dropDownButton">
                  <i class="fas fa-user"></i>
                </Link>
                <div className="toggleOptions-dropDownContent">
                  <Link
                    to="/service/profile"
                    className="toggleOptions-dropDownOption"
                  >
                    Profile
                  </Link>
                  <button className="toggleOptions-dropDownOption">
                    <a href="/api/logout">LogOut</a>
                  </button>
                </div>
              </div>
            ];
          default:
            return (
              <button className="toggleOptions-dropDownOption">
                <a href="/api/logout">LogOut</a>
              </button>
            );
        }
    }
  }

  render() {
    return (
      <nav id="mainNavBar">
        <div className="mainNavBar-Brand">
          <Link to="/">
            <img
              id="mainNavBar-BrandLogo-mobile"
              className="mainNavBar-BrandLogo"
              src={require("../images/Screenshot from 2019-12-20 11.01.24.png")}
              alt="Khareed"
            />
            {/* Place logo/name here */}
          </Link>
        </div>
        <button
          id="toggler-toggleOptions"
          onClick={this.searchAndOptionsToggleHandle}
        >
          <i class="fas fa-plus"></i>
        </button>
        <div className="mainNavBar-DekstopSearchForm">{this.renderForm()}</div>
        <div id="mobile-none" className="toggleOptions">
          {this.renderContent()}
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(
  mapStateToProps,
  { searchProducts }
)(withRouter(Header));
