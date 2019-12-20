import "./service.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Route } from "react-router-dom";
import { fetchService, updateService } from "../../actions/serviceActions";
import ServiceProfile from "./ServiceProfile";
import ServiceRetailerOrders from "./ServiceRetailerOrders";
import ServiceCustomerOrders from "./ServiceCustomerOrders";
import ServiceServiceOrders from "./ServiceServiceOrders";
class ServiceDashboard extends Component {
  componentDidMount() {
    this.props.fetchService();
  }

  render() {
    if (this.props.service.profile === null) return <h2>Loading</h2>;

    return (
      <div className="retailerMain">
        <div className="sideBar">
          <img
            className="img"
            src="https://www.irreverentgent.com/wp-content/uploads/2018/03/Awesome-Profile-Pictures-for-Guys-look-away2.jpg"
            alt="Profile"
          />
          <Link className="link" to="/service/profile">
            Profile
          </Link>
          <Link className="link" to="/service/retailerOrders">
            Retailer Orders
          </Link>
          <Link className="link" to="/service/customerOrders">
            Customer Orders
          </Link>
          <Link className="link" to="/service/serviceOrders">
            Service Orders
          </Link>
        </div>
        <div id="serviceMobileDashboardNav">
          <Link className="link" to="/service/profile">
            <i class="fas fa-user-tie"></i>
          </Link>
          <Link className="link" to="/service/serviceOrders">
            S.O
          </Link>
          <Link className="link" to="/service/retailerOrders">
            R.O
          </Link>
          <Link className="link" to="/service/customerOrders">
            C.O
          </Link>
        </div>
        <div className="retailerContent">
          <Route
            exact
            path="/service/profile"
            render={() => {
              return (
                <ServiceProfile
                  service={this.props.service.profile}
                  updateService={this.props.updateService}
                />
              );
            }}
          />
          <Route
            path="/service/retailerOrders"
            render={() => {
              return <ServiceRetailerOrders />;
            }}
          />
          <Route
            path="/service/customerOrders"
            render={() => {
              return <ServiceCustomerOrders />;
            }}
          />
          <Route
            path="/service/serviceOrders"
            render={() => {
              return <ServiceServiceOrders />;
            }}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  service: store.service
});

export default connect(
  mapStateToProps,
  { fetchService, updateService }
)(ServiceDashboard);
