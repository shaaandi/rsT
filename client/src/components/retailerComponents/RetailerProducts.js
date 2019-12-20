import React, { Component } from "react";
import { Link, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchRetailerProducts } from "../../actions/retailerActions";

class RetailerProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: null,
      pageNum: 1
    };
  }

  async componentDidMount() {
    let products = await this.props.fetchRetailerProducts(
      this.props.options.pageNum
    );
    this.setState({
      products: products,
      pageNum: this.props.options.pageNum ? this.props.options.pageNum : 1
    });
    return;
  }

  jumpOptions = () => {
    let maxPageLimit = Math.trunc(this.props.totalResultCount / 20) + 1;
    let options = [];
    for (let i = 1; i <= maxPageLimit; i++) {
      options.push(<option value={i}>{i}</option>);
    }
    if (options.length === maxPageLimit) {
      return options;
    }
  };

  handlePageTransition = async (mode, num = 1) => {
    let pageNum;
    if (mode === "prev") pageNum = parseInt(this.state.pageNum) - 1;
    if (mode === "next") pageNum = parseInt(this.state.pageNum) + 1;
    if (mode === "jump") pageNum = num;
    await this.setState({
      pageNum
    });
    await this.props.fetchRetailerProducts(pageNum);
    await this.props.history.push(`/retailer/products?pageNum=${pageNum}`);
    return;
  };

  renderPagingForm = () => {
    return (
      <div className="paging">
        <button onClick={() => this.handlePageTransition("prev")}>Prev</button>
        <button onClick={() => this.handlePageTransition("next")}>Next</button>
        <select
          name="jumpNum"
          onChange={e => {
            this.handlePageTransition("jump", e.target.value);
          }}
          type="number"
          max={this.props.totalResultCount}
          defaultValue={this.state.filters.pageNum}
          min={1}
        >
          {this.jumpOptions()}
        </select>
      </div>
    );
  };

  render() {
    if (this.props.products === null) return <h1>Loading . . .</h1>;
    else {
      let Products = this.props.products.map(p => {
        return (
          <div key={p._id} className="retailerProducts-product">
            <img src={p.imgSrc} alt="Image of Product" />
            <div className="productInformation">
              <h3>{p.title}</h3>
              <h4>Rs: {p.price}</h4>
              <Link to={`/retailer/products/${p._id}`}>View Product</Link>
            </div>
          </div>
        );
      });
      return [
        <div className="retailerProducts">{Products}</div>,
        <div className="paging">
          <button onClick={() => this.handlePageTransition("prev")}>
            Prev
          </button>
          <button onClick={() => this.handlePageTransition("next")}>
            Next
          </button>
          <select
            name="jumpNum"
            onChange={e => {
              this.handlePageTransition("jump", e.target.value);
            }}
            type="number"
            max={this.props.totalResultCount}
            defaultValue={this.state.pageNum}
            min={1}
          >
            {this.jumpOptions()}
          </select>
        </div>
      ];
    }
  }
}

const mapStoreToProps = store => ({
  products: store.retailer.products
});

export default connect(
  mapStoreToProps,
  { fetchRetailerProducts }
)(withRouter(RetailerProducts));
