import React, { Component } from "react";
import * as actions from "../../actions/customerActions";
import { connect } from "react-redux";

class CustomerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileEditMode: false,
      name: "",
      address: ""
    };
  }

  async componentDidMount() {
    let { profile } = this.props;
    if (profile !== null) {
      this.setState({
        name: profile.name,
        address: profile.address,
        profileEditMode: false
      });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.updateCustomer(this.state);
    this.setState({
      name: "",
      address: "",
      profileEditMode: false
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleClick = () => {
    this.setState({
      profileEditMode: !this.state.profileEditMode
    });
  };

  renderContent = () => {
    return this.state.profileEditMode
      ? [
          <form onSubmit={this.handleSubmit}>
            <label>
              Name :
              <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </label>
            <label>
              Address :
              <input
                type="text"
                name="address"
                value={this.state.address}
                onChange={this.handleChange}
              />
            </label>
            <button>Update</button>
          </form>,
          <button onClick={this.handleClick}>Back</button>
        ]
      : [
          <div>
            <li>Name : {this.props.profile.name}</li>
            <li>Badge : {this.props.profile.badge}</li>
            <li>Address : {this.props.profile.address || ""}</li>
          </div>,
          <button onClick={this.handleClick}>Edit Profile</button>
        ];
  };

  render() {
    if (this.props.profile === null) {
      return <div></div>;
    }
    return (
      <div className="retailerProfile">
        {/* <img
          src="https://static.thenounproject.com/png/9355-200.png"
          alt="Profile Image"
        /> */}
        {this.renderContent()}
      </div>
    );
  }
}

const mapStoreToProps = store => ({
  profile: store.customer.profile
});

export default connect(
  mapStoreToProps,
  actions
)(CustomerProfile);
