import React, { Component } from "react";
import { connect } from "react-redux";
import { addProduct } from "../../actions/retailerActions";

class NewProductForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      price: 0,
      description: "",
      quantity: "",
      brand: "",
      imgSrc: ""
    };
  }

  handleSubmit = async e => {
    e.preventDefault();
    let data = { ...this.state };
    await this.props.addProduct(data, "/api/retailer/inventory", "POST");
    this.setState({
      title: "",
      price: 0,
      description: "",
      quantity: "",
      brand: "",
      imgSrc: "",
      category : "",
      subCategory : ""
    });
    this.props.history.push("/retailer/products");
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <form
        id="retailerAddNewProductMobileForm"
        className="retailerAddNewProductDekstopForm"
        onSubmit={this.handleSubmit}
      >
        <h2>Add new Product</h2>
        <label>
          <span>Title</span>
          <input type="text" name="title" onChange={this.handleChange} />
        </label>
        <label>
          <span>Price</span>
          <input type="number" name="price" onChange={this.handleChange} />
        </label>
        <label>
          <span>Image Source</span>
          <input type="text" name="imgSrc" onChange={this.handleChange} />
        </label>
        <label>
          <span>Product Description</span>
          <textarea
            type="textarea"
            name="description"
            rows="5"
            cols="35"
            onChange={this.handleChange}
          />
        </label>
        <label>
          <span>Quantity</span>
          <input type="number" name="quantity" onChange={this.handleChange} />
        </label>
        <label>
          <span>Brand</span>
          <input type="text" name="brand" onChange={this.handleChange} />
        </label>
        <label>
          <span>Category</span>
          <input type="text" name="category" onChange={this.handleChange} />
        </label>
        <label>
          <span>Sub Category</span>
          <input type="text" name="subCategory" onChange={this.handleChange} />
        </label>
        <button>Submit</button>
      </form>
    );
  }
}

export default connect(
  null,
  { addProduct }
)(NewProductForm);
