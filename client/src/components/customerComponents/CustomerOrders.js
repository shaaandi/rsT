import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/customerActions";
import { withRouter, Route } from "react-router-dom";
import CustomerOrder from "./CustomerOrder";

class CustomerOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: null
    };
  }

  async componentDidMount() {
    let orders = await this.props.fetchCustomerSection("customerOrders");
    this.setState({
      orders
    });
    return;
  }

  render() {
    if (this.state.orders === null) return <div></div>;
    return [
      <Route
        exact
        path={`/customer/customerOrders`}
        render={() => {
          let Orders = this.state.orders.map(order => {
            return (
              <div className="order">
                <h3>
                  <span>Order Id : </span>
                  {order._id}
                </h3>
                <h3>
                  <span>Status : </span>
                  {order.status}
                </h3>
                <h3>
                  <span>Issued Date : </span>a week ago
                </h3>
                <button
                  onClick={() =>
                    this.props.history.push(
                      `/customer/customerOrders/${order._id}`
                    )
                  }
                >
                  View
                </button>
              </div>
            );
          });
          return (
            <div className="orders">
              <h2>Orders</h2>
              {Orders}
            </div>
          );
        }}
      />,
      <Route
        exact
        path={`/customer/customerOrders/:orderId`}
        render={({ match }) => {
          return <CustomerOrder id={match.params.orderId} />;
        }}
      />
    ];
  }
}

const mapStoreToProps = store => ({
  customerOrders: store.customer.customerOrders
});

export default connect(
  mapStoreToProps,
  actions
)(withRouter(CustomerOrders));
