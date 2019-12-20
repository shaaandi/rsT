import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';
import * as actions from '../../actions/serviceActions';
import ServiceCustomerOrder from './ServiceCustomerOrder';
class ServiceCustomerOrders extends Component {

    constructor(props){
        super(props)
        this.state = {
            orders : []
        }
    }

    async componentDidMount() {
        this.setState({
            orders : []
        })
        await this.props.fetchServiceOrders('customerOrders');
        let orders = await this.props.service.customerOrders.filter(order => {
            return order.status === 'At Service'
        })
        this.setState({
            orders : orders
        })
    }

   

    switchOrders = async (status) => {
        let orders = await this.props.service.customerOrders.filter(order => {
            return order.status === status
        })
        this.setState({
            orders
        })
    }

    render () {
        if (this.props.orders === null) return  <h1>Loading</h1>
        let orders = this.state.orders.map(order => {
            return (
                <div className='order' key={order._id}>
                <h3><span>Order Id : </span>{order._id}</h3>
                <h3><span>Status : </span>{order.status}</h3>
                <h3><span>Issued Date : </span>a week ago</h3>
                <button onClick={() => this.props.history.push(`/service/customerOrders/${order._id}`)}>View</button>
            </div>
            )
        })

        return (
            [
            <Route 
            exact path='/service/customerOrders'
            render = {() => {
                return(
                       [<div className='serviceNav'>
                            <button className='link' onClick={() => this.switchOrders('Processed')}>Processed</button>
                            <button className='link' onClick={() => this.switchOrders('At Service')}>At Service</button>
                            <button className='link' onClick={() => this.switchOrders('Delivering')}>Delivering</button>
                            <button className='link' onClick={() => this.switchOrders('Delivered')}>Delivered</button>
                        </div>,
                        <div className='orders'>
                            {orders}
                        </div>
                       ]
                )
            }}
            />,
            <Route 
            exact path='/service/customerOrders/:orderId'
            render={({match}) => {
                return (
                    <ServiceCustomerOrder id={match.params.orderId} />
                )
            }}
            />
            ]
        )
    }
    
}

const mapStateToProps = (store) => ({
    service : store.service,
    orders : store.service.customerOrders
})
export default connect(mapStateToProps,actions)(withRouter(ServiceCustomerOrders));