import React from 'react';
import NavBar from './NavBar';

export default React.createClass({
    render() {
        return(
            <div>
                <h1>Marit Dik</h1>
                {<NavBar pages={this.props.params.pages}/>}
                {this.props.children}
            </div>
        )
    }
})

