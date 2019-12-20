import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import { withRouter } from "react-router-dom";

class Initialize extends Component {
  constructor() {
    super();
    this.state = {
      badge: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.setUserBadge(this.state.badge, this.props.history);
  };

  renderContent() {
    if (this.props.auth === false) return <li>Login First</li>;
    if (this.props.auth === null) return <li>Loading ...</li>;
    switch (this.props.auth.initialized) {
      case null:
        return;
      case false:
        return [
          <h4>Choose your Account Type</h4>,
          <form onSubmit={this.handleSubmit}>
            <label>
              <input
                className="formRadio"
                type="radio"
                name="badge"
                value="CUSTOMER"
                onChange={this.handleChange}
              />
              CUSTOMER
            </label>
            <label>
              <input
                className="formRadio"
                type="radio"
                name="badge"
                value="RETAILER"
                onChange={this.handleChange}
              />
              RETAILER
            </label>
            <label>
              <input
                className="formRadio"
                type="radio"
                name="badge"
                value="SERVICE"
                onChange={this.handleChange}
              />
              SERVICE
            </label>

            <button className="waves-effect waves-light btn">Submit</button>
          </form>
        ];
      case true:
        return <li>You are not authorized</li>;
    }
  }

  render() {
    return <div className="initializeForm">{this.renderContent()}</div>;
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(
  mapStateToProps,
  actions
)(withRouter(Initialize));
