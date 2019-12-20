import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

class RefershRoute extends Component{
    componentDidMount() {

        let {pathname, search} = this.props.history.location.state.forwardRoute;
        this.props.history.replace({
            pathname,
            search,
            state : {
                forwardRoute : null
            }
        })
    }

    render() {
        return (
            <h1>Loading . ..  </h1>
        )
    }
} 



export default withRouter(RefershRoute)