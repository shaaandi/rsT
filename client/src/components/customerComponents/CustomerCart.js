import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import * as actions from "../../actions/customerActions";
import Payment from "./Payment";

class CustomerCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartQuantity: null
    };
  }

  async componentDidMount() {
    await this.props.fetchCustomerSection("cart");
  }

  sliceStrings = (str, limit) => {
    if (str.length > limit) {
      return `${str.slice(0, limit)} ...`;
    } else return str;
  };

  render() {
    if (
      this.props.cart.products === null ||
      this.props.cart.cartQuantity === null
    )
      return <div></div>;

    const { products, cartQuantity } = this.props.cart;
    let totalAmount = 0;
    const quant = id => {
      let num = cartQuantity[id];
      return [
        <h5 className="cartText">Quantity : {num}</h5>,
        <button
          className="cartProductIncrement cartButton"
          onClick={() => this.props.cartQuantitySetter(id, "dec")}
        >
          -
        </button>,
        <button
          className="cartProductDecrement cartButton"
          onClick={() => this.props.cartQuantitySetter(id, "inc")}
        >
          +
        </button>
      ];
    };

    let Products = products.map(p => {
      let numberOfProducts = cartQuantity[p._id];
      totalAmount = totalAmount + parseInt(p.price) * numberOfProducts;
      return (
        <div key={p._id} className="cartProduct">
          <img className="cartImage" src={p.imgSrc} alt="Image of Product" />
          <div className="cartProductInformation">
            <h3 className="cartText">{this.sliceStrings(p.title, 18)}</h3>
            <h4 className="cartText"> ${p.price}</h4>
            {quant(p._id)}
            <Link to={`/shop/products/${p._id}`} className="cartText">
              View Product
            </Link>
            <button
              className="cartProductRemove cartButton"
              onClick={() => this.props.removeProductFromCart(p._id)}
            >
              X
            </button>
          </div>
        </div>
      );
    });

    return (
      <div className="cart">
        <div className="cartHeader">
          <h3>Cart</h3>
          <h4>Total Amount : ${totalAmount}/_</h4>
        </div>
        <div className="cartProducts">
          {Products}
          <div className="cartBuyProduct">
            <Payment amount={totalAmount * 100} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStoreToProps = store => ({
  cart: store.customer.cart
});

export default connect(
  mapStoreToProps,
  actions
)(withRouter(CustomerCart));
