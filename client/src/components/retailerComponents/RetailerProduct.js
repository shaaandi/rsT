import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchProduct } from "../../actions/shoppingActions";
import { deleteProduct } from "../../actions/retailerActions";
import EditProductForm from "./EditProductForm";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      product: null
    };
  }

  async componentDidMount() {
    let product = await this.props.fetchProduct(this.props.id);
    await this.setState({
      product: product
    });
    return;
  }

  handleClick = () => {
    this.setState({
      editMode: !this.state.editMode
    });
  };

  handleDelete = async () => {
    await this.props.deleteProduct(this.props.id);
    await this.props.delete(this.props.id);
    this.props.history.push("/retailer/products");
    return;
  };

  handleRefresh = async product => {
    await this.setState({
      product: product,
      editMode: false
    });
    return;
  };

  render() {
    if (this.state.product === null) return <h2>Loading...</h2>;
    let product = this.state.product;
    return !this.state.editMode ? (
      <div className="mainProduct">
        <div className="productHeader">
          <div>
            <img src={product.imgSrc} alt="product picture" />
          </div>
          <div className="productIntro">
            <li>Title : {product.title}</li>
            <li>Price : {product.price}</li>
            <li>Brand : {product.brand || "Not Branded"}</li>
            <li>Quantity : {product.quantity || "Unknown"}</li>
            <div>
              <button onClick={this.handleClick}>Edit Product</button>
            </div>
          </div>
        </div>
        <div className="productDescription">
          <h2>Description</h2>
          {product.description || "There is no description"}
        </div>
      </div>
    ) : (
      <div>
        <EditProductForm
          id={this.props.id}
          product={this.state.product}
          refresh={this.handleRefresh}
        />
        <button onClick={this.handleClick}>Back</button>
      </div>
    );
  }
}

export default connect(
  null,
  { fetchProduct, deleteProduct }
)(withRouter(Product));
