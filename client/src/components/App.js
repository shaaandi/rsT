import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/index";
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import Header from "./Header";
import Initialize from "./Initialize";
import RetailerDashboard from "./retailerComponents/RetailerDashboard";
import CustomerDashboard from "./customerComponents/CustomerDashboard";
import ServiceDashboard from "./serviceComponents/ServiceDashboard";
import SearchProducts from "./SearchProducts";
import Flash from "./Flash";
import shoppingDashboard from "./shoppingComponents/shoppingDashboard";
import queryString from "query-string";
import RefreshRoute from "./RefreshRoute";
import Landing from "./Landing";

class App extends Component {
  async componentDidMount() {
    await this.props.fetchUser();
    return;
  }

  flash = () => {
    if (this.props.flash.loading) return <Flash />;
  };

  render() {
    let user = this.props.auth;
    return (
      <Router>
        <Header />
        {this.flash()}
        <Route path="/empty" render={() => <RefreshRoute />} />
        <Route
          exact
          path="/"
          render={() => <Landing user={this.props.auth} />}
        />
        <Route
          path="/retailer"
          render={() => {
            if (user) {
              if (this.props.auth.badge === "RETAILER")
                return <RetailerDashboard />;
              else return <li>UnAuthorized</li>;
            } else {
              return <li>UnAuthenticated</li>;
            }
          }}
        />
        <Route
          path="/customer"
          render={() => {
            if (user) {
              if (user.badge === "CUSTOMER") return <CustomerDashboard />;
              else return <li>UnAuthorized</li>;
            } else {
              return <li>UnAuthenticated</li>;
            }
          }}
        />
        <Route
          path="/service"
          render={() => {
            if (user) {
              if (user.badge === "SERVICE") return <ServiceDashboard />;
              else return <li>UnAuthorized</li>;
            } else {
              return <li>UnAuthenticated</li>;
            }
          }}
        />
        <Route
          path="/user/initialize"
          render={() => {
            if (user) {
              if (user.initialized) return <li>User already Initialized</li>;
              else return <Initialize />;
            } else {
              return <li>UnAuthenticated</li>;
            }
          }}
        />
        <Route path="/shop" component={shoppingDashboard} />
        <Route
          path="/search/titleSearch/:query"
          render={({ match, location }) => {
            let { query } = match.params;
            let options = queryString.parse(location.search);
            let urlQuery = location.search;
            console.log({ match, location });
            return (
              <SearchProducts
                query={query}
                options={options}
                urlQuery={urlQuery}
              />
            );
          }}
        />
      </Router>
    );
  }
}

const mapStateToProps = store => ({
  flash: store.flash,
  auth: store.auth
});

export default connect(
  mapStateToProps,
  actions
)(App);
