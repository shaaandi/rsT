import React , {Component} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import {connect} from 'react-redux';
import * as actions from '../../actions/customerActions';
import {withRouter} from 'react-router-dom';

class Payment extends Component {

    constructor(props){
        super(props)
    }

    onToken = async   (token) =>  {
        await this.props.handleToken(token,this.props.amount);
        this.props.history.push('/customer/customerOrders');
    }

    render () {
        return (
            <StripeCheckout
                name = 'Khareed Dev'
                description = 'Thanks for buying with Khareed'
                stripeKey = {process.env.REACT_APP_STRIPE_KEY}
                token = {this.onToken}
                label = 'Buy Now'
                ComponentClass="btn"
                amount = {this.props.amount}
            />
        )
    }
}

export default connect(null, actions)(withRouter(Payment));
