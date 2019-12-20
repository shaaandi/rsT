import React,  {Component} from 'react';
import {withRouter} from 'react-router-dom';


class RedirectPage extends Component {

    componentDidMount(){
        this.props.history.replace(this.props.forward)
    }

    render() {
        return(
            <h2>Redirect Page</h2>
        )
    }
}


export default withRouter(RedirectPage)