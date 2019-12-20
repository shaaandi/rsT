import React, {Component} from 'react';
import * as actions from '../../actions/serviceActions';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
class ServiceRetailerOrder extends Component{

    constructor(props){
        super(props)
        this.state = {
            order : null,
            editMode : true,
            service : '',
            services : null
        }
    }

    async componentDidMount(){
       let response = await this.props.fetchServiceOrder(this.props.id, 'retailerOrders')
       if(response){
           this.setState({
                order : response.order,
                services : response.services
           })
       }
    }

    addToCustomerOrders = async  () => {
        this.props.history.push('/service/retailerOrders')
        await this.props.serviceRetailerOrderConfirmation(this.state.order._id, false)
    }

    handleChange = (event) => {
        this.setState({service: event.target.value});
    }

    handleSubmit = async  (event) => {
        event.preventDefault();
        this.props.history.push('/service/retailerOrders')
        await this.props.serviceRetailerOrderConfirmation(this.state.order._id, true, {recieverId : this.state.service})
        this.props.history.push('/service/serviceOrders')
    }  
    renderForm = () => {
        if (this.state.editMode) {
            let options = this.state.services.map(service => {
                return (
                    <option value={service._id}>{service.address}</option>
                )
            })
            return (
                <form id='serviceChooseForm' onSubmit={this.handleSubmit}>
                    <label>
                        <span>
                        Choose your preferred Service Center
                        </span>
                        <select value={this.state.service} onChange={this.handleChange}>
                            <option value={''}>Choose your preferred Service Center</option>
                            {options}
                        </select>
                    </label>
                <input type="submit" value="Forward" />
                </form>
            )
        } else {
            return <div></div>
        }
    }

    renderOptions = () => {
        if (this.state.order.status === 'Pending') {
            return([
                <button className='link' onClick={this.addToCustomerOrders}>Add to Customer Orders</button>,
                <div>{this.renderForm()}</div>
            ]
            )
        }
        else return <div></div>
    }


    render() {
        if (this.state.order === null) return <div>Wait ....</div>
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
                    <h3><span>Customer Address : </span>{this.state.order.customerOrderId.shippingAddress}</h3>
                    {this.renderOptions()}
                </div>
                <div className='cartProducts'>
                     <span className='headings'>Products</span>
                    {products}
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    otherServices : state.service.otherServices
})

export default connect(mapStateToProps,actions)(withRouter(ServiceRetailerOrder));