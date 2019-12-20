// import React, {Component} from 'react';
// import {connect} from 'react-redux';
// import {Link, Route, withRouter} from 'react-router-dom';
// import * as actions from '../actions';
// // import Product from './customerComponents/Product';

// class Main extends Component {

//     constructor(props){
//         super(props)
//     }

//     componentDidMount() {
//         this.props.fetchProducts();
//     }

//     renderProducts = () => {
        
//     }

//     render() {
//         if  (!this.props.products) {
//             return (
//                 <div>
//                 Loading ... 
//                 </div>
//             )
//         } 
//         else {
//             const Products = this.props.products.map(p => {
//                 return (
//                     <div key={p._id} className='product'>
//                     <img src={p.imgSrc} alt="Image of Product"/>
//                     <div className='productInformation'>
//                         <h3>{p.title}</h3>
//                         <h4>Rs: {p.price}</h4>
//                         <Link to={`/products/${p._id}`}>View Product</Link>
//                     </div>
//                     </div>
//                 )
//             })
//             return (
//             <div className='mainProducts'>
//                 <Route exact path="/products" render={() =>
//                     <div className='mainProducts'>
//                          {Products}
//                     </div>
//                   } 
                  
//                 />
//                 <Route  path="/products/:id"  render={({match}) => {
//                     return (<Product user={'customer'} id={match.params.id} history={this.props.history}/>)
//                 }} />
//             </div>
//         )  }
//     }
// }

// const mapStateToProps = (store) => ({
//     products : store.products
// })

// export default connect(mapStateToProps,actions)(withRouter(Main))