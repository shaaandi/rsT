import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {addProduct} from '../../actions/retailerActions';

class EditProductForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            editMode : false,
            title : '',
            price : 0,
            description : '',
            quantity : '',
            brand : '',
            imgSrc : ''
        }
    }

    componentDidMount(){
        const {title,price,description,quantity,brand,imgSrc} = this.props.product
        this.setState({
            title, 
            price,
            description,
            quantity,
            brand,
            imgSrc
        }) 
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        let data = {...this.state, id: this.props.id}
        let product = await this.props.addProduct(data, '/api/retailer/inventory', 'PUT')
        await this.setState({ 
            title : '',
            imgSrc : '',
            price : 0,
            imgSrc : '',
            editMode : false
        })
        await this.props.refresh(product)
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }



    handleClick = () => {
        this.setState({
            editMode : !this.state.editMode
        })
    }

    render  ()  {
        const {title, price, imgSrc, description, quantity, brand} = this.state
        return (
                <form onSubmit={this.handleSubmit} >
                    <label >Title
                    <input type="text" name='title' defaultValue={title}  onChange={this.handleChange}/>
                    </label>
                    <label >Price
                    <input type="number" name='price' defaultValue={price}  onChange={this.handleChange}/>
                    </label>
                    <label >Image Source
                    <input type="text" name='imgSrc' defaultValue={imgSrc}  onChange={this.handleChange}/>
                    </label>
                    <label >Product Description
                    <input type="text" name='description' defaultValue={description}  onChange={this.handleChange}/>
                    </label>
                    <label >Quantity
                    <input type="number" name='quantity' defaultValue={quantity}  onChange={this.handleChange}/>
                    </label>
                    <label >Brand
                    <input type="text" name='brand' defaultValue={brand}  onChange={this.handleChange}/>
                    </label>
                    <button>Save</button>
                </form>
        )
    }  
  
}


export default connect(null, {addProduct})(withRouter(EditProductForm))