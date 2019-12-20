import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Link } from "react-router-dom";
import { fetchRetailerOrders } from "../../actions/retailerActions";
import RetailerOrder from "./RetailerOrder";
class RetailerOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: null
    };
  }

  async componentDidMount() {
    let orders = await this.props.fetchRetailerOrders();
    await this.setState({
      orders: orders
    });
    return;
  }

  render() {
    if (this.state.orders === null) return <h1>Loading . . .</h1>;
    return [
      <Route
        exact
        path="/retailer/orders"
        render={() => {
          let orders = this.state.orders.map(order => {
            return (
              <div className="order">
                <h3>
                  <span>Order Id : </span>
                  {order._id}
                </h3>
                <h3>
                  <span>Total Amount : </span>
                  {order.tAmount}
                </h3>
                <h3>
                  <span>Status : </span>
                  {order.status}
                </h3>
                <Link to={`/retailer/orders/${order._id}`}>View</Link>
              </div>
            );
          });
          return (
            <div className="orders">
              Orders
              {orders}
            </div>
          );
        }}
      />,
      <Route
        path="/retailer/orders/:id"
        render={({ match }) => {
          return <RetailerOrder id={match.params.id} />;
        }}
      />
    ];
  }
}

export default connect(
  null,
  { fetchRetailerOrders }
)(withRouter(RetailerOrders));
