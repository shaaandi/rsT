import React, {Component} from 'react';

class ServiceProfile extends Component {
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
            name : this.props.service.name,
            address : this.props.service.address,
            profileEditMode : false
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.updateService(this.state)
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
            <form onSubmit={this.handleSubmit}>
                <label>Name :
                <input type="text" name='name' value={this.state.name} onChange={this.handleChange}/>
                </label>
                <label >Address :
                <input type="text" name='address' value={this.state.address} onChange={this.handleChange}/>
                </label>
                <button>Update</button>
            </form>
        ) : (
            
            <div>
                <li>Name : {this.props.service.name}</li>
                <li>Badge : {this.props.service.badge}</li>
                <li>Address : {this.props.service.address || ''}</li>
            </div>
        )
    }

    render () {
        return (
            <div className='retailerProfile'>
                <img src="https://static.thenounproject.com/png/9355-200.png" alt="Profile Image"/>
                    {this.renderContent()}
                <button onClick={this.handleClick}>Edit Profile</button>
            </div>    
        )
    }
    
} 
    

    
export default ServiceProfile;