import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';
import {fetchServiceOrders} from '../../actions/serviceActions';
import ServiceRetailerOrder from './ServiceRetailerOrder';
class ServiceRetailerOrders extends Component {

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
        await this.props.fetchServiceOrders('retailerOrders');
        let orders = await this.props.service.retailerOrders.filter(order => {
            return order.status === 'Pending'
        })
        this.setState({
            orders : orders
        })
    }

   

    switchOrders = async (status) => {
        let orders = await this.props.service.retailerOrders.filter(order => {
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
                <button onClick={() => this.props.history.push(`/service/retailerOrders/${order._id}`)}>View</button>
            </div>
            )
        })

        return (
            [
            <Route 
            exact path='/service/retailerOrders'
            render = {() => {
                return(
                    <div className='serviceSubSection'>
                        <div className='serviceNav'>
                            <button className='link' onClick={() => this.switchOrders('Pending')} value='Pending'>Pending</button>
                            <button className='link' onClick={() => this.switchOrders('Recieved')} value='Recieved'>Recieved</button>
                        </div>
                        <div className='orders'>
                            {orders}
                        </div>
                    </div>
                )
            }}
            />,
            <Route 
            exact path='/service/retailerOrders/:orderId'
            render={({match}) => {
                return (
                    <ServiceRetailerOrder id={match.params.orderId} />
                )
            }}
            />
            ]
        )
    }
    
}

const mapStateToProps = (store) => ({
    service : store.service,
    orders : store.service.retailerOrders
})
export default connect(mapStateToProps,{fetchServiceOrders})(withRouter(ServiceRetailerOrders));