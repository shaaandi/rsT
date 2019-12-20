import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';
import * as actions from '../../actions/serviceActions';
import ServiceServiceOrder from './ServiceServiceOrder';
class ServiceServiceOrders extends Component {

    constructor(props){
        super(props)
        this.state = {
            orders : [],
            allOrders : []
        }
    }

    async componentDidMount() {
        this.setState({
            orders : []
        })
        await this.props.fetchServiceOrders('serviceOrders');
        let allOrders = await this.props.service.serviceOrders.filter(order => {
            return order.senderId === this.props.profile._id
        })
        let orders = await allOrders.filter(order => {
            return order.status === 'Pending'
        })
        this.setState({
            allOrders : allOrders,
            orders : orders
        })
    }

   

    switchOrders = async (status) => {
        let orders = await this.state.allOrders.filter(order => {
            return order.status === status
        })
        this.setState({
            orders
        })
    }

    switchAllOrders = async (type) => {
        let allOrders = await this.props.service.serviceOrders.filter(order => {
            if (type === 'Sent'){
                return order.senderId === this.props.profile._id
            }
            else {
                return order.recieverId === this.props.profile._id
            }
        })
        let orders = await allOrders.filter(order => {
            return order.status === 'Pending'
        })
        this.setState({
            allOrders,
            orders
        })
    }

    render () {
        if (this.props.allOrders === null) return  <h1>Loading</h1>
        let orders = this.state.orders.map(order => {
            return (
                <div className='order' key={order._id}>
                <h3><span>Order Id : </span>{order._id}</h3>
                <h3><span>Status : </span>{order.status}</h3>
                <h3><span>Issued Date : </span>a week ago</h3>
                <button onClick={() => this.props.history.push(`/service/serviceOrders/${order._id}`)}>View</button>
            </div>
            )
        })

        return (
            [
            <Route 
            exact path='/service/serviceOrders'
            render = {() => {
                return(
                    <div className='serviceSubSection'>
                        <div className='serviceNav'>
                            <button className='link' onClick={() => this.switchAllOrders('Sent')} value='Pending'>Sent</button>
                            <button className='link' onClick={() => this.switchAllOrders('Recieved')} value='Recieved'>Recieved</button>
                        </div>
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
            exact path='/service/serviceOrders/:orderId'
            render={({match}) => {
                return (
                    <ServiceServiceOrder id={match.params.orderId} />
                )
            }}
            />
            ]
        )
    }
    
}

const mapStateToProps = (store) => ({
    profile : store.auth,
    service : store.service,
    allOrders : store.service.serviceOrders
})
export default connect(mapStateToProps,actions)(withRouter(ServiceServiceOrders));