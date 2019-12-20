import React, {Component} from 'react';
import * as actions from '../../actions/customerActions';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
class CustomerOrder extends Component{

    constructor(props){
        super(props)
        this.state = {
            order : null
        }
    }

    async componentDidMount(){
       let order = await this.props.fetchCustomerOrder(this.props.id)
       this.setState({
           order
       })
    }



    render() {
        if (this.state.order === null) return <div></div>
        const products = this.state.order.products.map(p => {
            return (
                <div key={p._id} className='cartProduct'>
                    <img className='cartImage' src={p.imgSrc} alt="Image of Product"/>
                    <div className='cartProductInformation'>
                        <h3 className='cartText'>{p.title}</h3>
                        <h3 className='cartText'>Price: ${p.price}</h3>
                        <h3 className='cartText'>Quantity : {this.state.order.productsQuantity[p._id]}</h3>
                        <h3 className='cartText'>Total : ${p.price*this.state.order.productsQuantity[p._id]}</h3>
                        <button className='cartButton' onClick={() => this.props.history.push(`/products/${p._id}`)}>View Product</button>
                    </div>
                </div>

            )
        })
        return (
            <div id='order'>
                <div className='header'>
                    <h3><span>Order id : </span>{this.state.order._id}</h3>
                    <h3><span>Total Amount : </span>${this.state.order.tAmount}</h3>
                    <h3><span>Status : </span>{this.state.order.status}</h3>
                    <h3><span>Issued : </span>a week ago</h3>
                </div>
                <div className='cartProducts'>
                     <span className='headings'>Products</span>
                    {products}
                </div>
            </div>
        )
    }

}


export default connect(null,actions)(withRouter(CustomerOrder))