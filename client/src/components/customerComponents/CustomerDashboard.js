import "./customer.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/customerActions";
import { Route, Link, withRouter } from "react-router-dom";
import CustomerProfile from "./CustomerProfile";
import CustomerCart from "./CustomerCart";
import CustomerOrders from "./CustomerOrders";
import CustomerWishList from "./CustomerWishList";

class RetailerDashboard extends Component {
  async componentWillMount() {
    await this.props.fetchCustomer();
    return;
  }

  render() {
    if (this.props.customer === null) {
      return <div></div>;
    }
    return (
      <div className="retailerMain">
        <div className="sideBar">
          <img
            className="img"
            src="https://www.irreverentgent.com/wp-content/uploads/2018/03/Awesome-Profile-Pictures-for-Guys-look-away2.jpg"
            alt="Profile"
          />
          <Link className="link" to="/customer/profile">
            Profile
          </Link>
          <Link className="link" to="/customer/wishlist">
            Wishlist
          </Link>
          <Link className="link" to="/customer/cart">
            Cart
          </Link>
          <Link className="link" to="/customer/customerOrders">
            Orders
          </Link>
        </div>
        <div id="customerMobileDashboardNav">
          <Link className="link" to="/customer/profile">
            <i class="fas fa-user-tie"></i>
          </Link>
          <Link className="link" to="/customer/wishlist">
            <i class="fas fa-warehouse"></i>
          </Link>
          <Link className="link" to="/customer/cart">
            <i class="fas fa-shopping-cart"></i>
          </Link>
          <Link className="link" to="/customer/customerOrders">
            <i class="fas fa-money-bill-wave"></i>
          </Link>
        </div>
        <div className="retailerContent">
          <Route
            exact
            path="/customer/profile"
            render={() => {
              return <CustomerProfile />;
            }}
          />
          <Route
            exact
            path="/customer/wishlist"
            render={() => {
              return <CustomerWishList />;
            }}
          />
          <Route
            exact
            path="/customer/cart"
            render={() => {
              return <CustomerCart />;
            }}
          />
          <Route
            path="/customer/customerOrders"
            render={() => {
              return <CustomerOrders />;
            }}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    customer: store.customer
  };
}

export default connect(
  mapStateToProps,
  actions
)(withRouter(RetailerDashboard));
