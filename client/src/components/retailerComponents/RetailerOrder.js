import React, {Component} from 'react';
import {fetchRetailerOrder, selectRetailerOrderService} from '../../actions/retailerActions';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
class RetailerOrder extends Component{

    constructor(props){
        super(props)
        this.state = {
            order : null,
            service : '',
            services : null
        }
    }

    async componentDidMount(){
       let response = await this.props.fetchRetailerOrder(this.props.id)
       await this.setState({
           order : response.order,
           services : response.services
       })
       return;
    }

    handleChange = (event) => {
        this.setState({service: event.target.value});
    }

    handleSubmit = async  (event) => {
        event.preventDefault();
        let order = await this.props.selectRetailerOrderService(this.state.order._id,this.state.service)
        console.log(order)
        await this.setState({
            order : order
        })
        
        return;
    }

    renderForm = () => {
        if (!this.state.order.serviceId) {
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
                <input type="submit" value="Submit" />
                </form>
            )
        } else {
            return <div></div>
        }
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
                        <Link to={`/products/${p._id}`}>View Product</Link>
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
                    {(this.state.order.serviceId) ? 
                    <h3><span>Service Center : </span>{this.state.order.serviceId.address}</h3>
                    :
                    <h3><span>Service Center : </span>Not selected yet</h3>
                    }
                </div>
                {this.renderForm()}
                <div className='cartProducts'>
                     <span className='headings'>Products</span>
                    {products}
                </div>
            </div>
        )
    }

}

export default connect(null,{fetchRetailerOrder, selectRetailerOrderService})(RetailerOrder)