import "./retailer.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchRetailer } from "../../actions/retailerActions";
import NewProductForm from "./NewProductForm";
import { Route, Link, withRouter } from "react-router-dom";
import RetailerProfile from "./RetailerProfile";
import RetailerProducts from "./RetailerProducts";
import RetailerProduct from "./RetailerProduct";
import RetailerOrders from "./RetailerOrders";
import queryString from "query-string";

class RetailerDashboard extends Component {
  async componentWillMount() {
    await this.props.fetchRetailer();
    return;
  }

  render() {
    if (this.props.profile === null) {
      return <li>Loading</li>;
    }
    return (
      <div className="retailerMain">
        <div className="sideBar">
          <img
            className="img"
            src="https://www.irreverentgent.com/wp-content/uploads/2018/03/Awesome-Profile-Pictures-for-Guys-look-away2.jpg"
            alt="Profile"
          />
          <Link className="link" to="/retailer/profile">
            Profile
          </Link>
          <Link className="link" to="/retailer/products">
            Products
          </Link>
          <Link className="link" to="/retailer/newProduct">
            Add New Product
          </Link>
          <Link className="link" to="/retailer/orders">
            Orders
          </Link>
        </div>
        <div id="retailerMobileDashboardNav">
          <Link className="link" to="/retailer/profile">
            <i class="fas fa-user-tie"></i>
          </Link>
          <Link className="link" to="/retailer/products">
            <i class="fas fa-warehouse"></i>
          </Link>
          <Link className="link" to="/retailer/newProduct">
            <i class="fas fa-cart-plus"></i>
          </Link>
          <Link className="link" to="/retailer/orders">
            <i class="fas fa-money-bill-wave"></i>
          </Link>
        </div>
        <div className="retailerContent">
          <Route
            exact
            path="/retailer/profile"
            render={() => {
              return <RetailerProfile />;
            }}
          />
          <Route
            exact
            path="/retailer/products"
            render={({ location }) => {
              let options = queryString.parse(location.search);
              return <RetailerProducts options={options} />;
            }}
          />
          <Route
            exact
            path="/retailer/newProduct"
            render={() => {
              return <NewProductForm history={this.props.history} />;
            }}
          />
          <Route
            path="/retailer/orders"
            render={({ match }) => {
              return <RetailerOrders />;
            }}
          />
          <Route
            path="/retailer/products/:id"
            render={({ match }) => {
              return <RetailerProduct id={match.params.id} />;
            }}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    profile: store.retailer.profile
  };
}

export default connect(
  mapStateToProps,
  { fetchRetailer }
)(withRouter(RetailerDashboard));
