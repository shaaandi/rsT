import "./landing.css";
import React, { Component } from "react";
import { Link } from "react-router-dom";
class Landing extends Component {
  // async componentDidMount() {
  //   await this.props.user;
  //   return;
  // }

  renderUserOptions = () => {
    let { name, badge } = this.props.user;
    switch (badge) {
      case "CUSTOMER":
        return [
          <Link className="link" to="/customer/profile">
            <i class="fas fa-user-tie"></i>
          </Link>,
          <Link className="link" to="/customer/wishlist">
            <i class="fas fa-warehouse"></i>
          </Link>,
          <Link className="link" to="/customer/cart">
            <i class="fas fa-shopping-cart"></i>
          </Link>,
          <Link className="link" to="/customer/customerOrders">
            <i class="fas fa-money-bill-wave"></i>
          </Link>
        ];
      case "RETAILER":
        return [
          <Link className="link" to="/retailer/profile">
            <i class="fas fa-user-tie"></i>
          </Link>,
          <Link className="link" to="/retailer/products">
            <i class="fas fa-warehouse"></i>
          </Link>,
          <Link className="link" to="/retailer/newProduct">
            <i class="fas fa-cart-plus"></i>
          </Link>,
          <Link className="link" to="/retailer/orders">
            <i class="fas fa-money-bill-wave"></i>
          </Link>
        ];
      case "SERVICE":
        return [
          <Link className="link" to="/service/profile">
            <i class="fas fa-user-tie"></i>
          </Link>,
          <Link className="link" to="/service/serviceOrders">
            S.O
          </Link>,
          <Link className="link" to="/service/retailerOrders">
            R.O
          </Link>,
          <Link className="link" to="/service/customerOrders">
            C.O
          </Link>
        ];
      default:
        return <a href="/auth/google">Login First</a>;
    }
  };

  render() {
    if (this.props.user === null) return <div></div>;
    let { name, badge } = this.props.user;
    return (
      <div id="landing">
        <div id="landing-header">
          <div id="landing-header-display">
            <div id="landing-header-wishing">
              <span id="jamboText">
                <span id="w">W</span>
                <span id="e">e</span>
                <span id="l">l</span>
                <span id="c">c</span>
                <span id="o">o</span>
                <span id="m">m</span>
                <span id="e">e</span>
              </span>
              {/* <span id="mediumText">to Khareed</span> */}
              <span id="mediumText">to raviStore</span>
            </div>
            <div id="landing-quickDisplay">
              <div id="quickDisplay-userOptions">
                <div id="userOptions-header">Hi, {name}</div>
                <div id="userOptions-options">{this.renderUserOptions()}</div>
              </div>
              <div id="quickDisplay-deals">
                <img
                  // alternative images link , desicions still to be make
                  // src="https://cdn.pixabay.com/photo/2017/01/31/00/31/buying-2022595_960_720.png"
                  src="https://images-na.ssl-images-amazon.com/images/G/01/US-hq/2018/img/Prime/XCM_Manual_1148572_GW___Prime_deals_260x260_Prime_260X260_Dashboard_Holiday_1542103794_jpg._SY260_CB479807016_.jpg"
                  alt="Deals"
                />
                <h3>Deals & Promotions</h3>
                <button>Shop Now</button>
              </div>
              <div id="quickDisplay-categories">
                <h3>Search by Categories</h3>
                <Link to="/shop/category/Automotive">Automotive</Link>
                <Link to="/shop/category/Baby">Baby</Link>
                <Link to="/shop/category/Home Improvement">
                  Home Improvement
                </Link>
                <Link to="/shop/category/Industrial Scientific">
                  Industrial Scientific
                </Link>
                <Link to="/shop/category/Lawn and Garden">Lawn and Garden</Link>
                <Link to="/shop/category/Outdoor">Outdoor</Link>
                <Link to="/shop/category/Pet Products">Pet Products</Link>
                <Link to="/shop/category/Sports">Sports</Link>
                <Link to="/shop/category/Toys">Toys</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;