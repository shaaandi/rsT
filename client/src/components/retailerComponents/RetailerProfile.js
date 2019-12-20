import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateRetailer} from '../../actions/retailerActions';


class RetailerProfile extends Component {
    constructor(props){
        super(props)
        this.state = {
            profileEditMode : false,
            name : '',
            address : ''
        }
    }

    componentDidMount(){
        this.setState({
            name : this.props.retailer.name,
            address : this.props.retailer.address,
            profileEditMode : false
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.updateRetailer(this.state)
        this.setState({
            name : '',
            address : '',
            profileEditMode : false
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleClick = () => {
        this.setState({
            profileEditMode : !this.state.profileEditMode
        })
    }

    renderContent = () => {
        return (this.state.profileEditMode) ? (
            [<form onSubmit={this.handleSubmit}>
                <label>Name :
                <input type="text" name='name' value={this.state.name} onChange={this.handleChange}/>
                </label>
                <label >Address :
                <input type="text" name='address' value={this.state.address} onChange={this.handleChange}/>
                </label>
                <button>Update</button>
            </form>,
            <button onClick={this.handleClick}>Back</button>]
        ) : (
            
            <div>
                <li>Name : {this.props.retailer.name}</li>
                <li>Badge : {this.props.retailer.badge}</li>
                <li>Address : {this.props.retailer.address || ''}</li>
                <button onClick={this.handleClick}>Edit Profile</button>
            </div>
        )
    }

    render () {
        return (
            <div className='retailerProfile'>
                <img src="https://static.thenounproject.com/png/9355-200.png" alt="Profile Image"/>
                    {this.renderContent()}
                
            </div>    
        )
    }
    
} 
    
const mapStateToProps = (store) => ({
    retailer : store.retailer.profile
})
    
export default connect(mapStateToProps,{updateRetailer})(RetailerProfile);