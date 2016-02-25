import React from 'react';
import NavBar from './NavBar';

export default React.createClass({
    displayName: 'App',


    render() {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'h1',
                null,
                'Marit Dik'
            ),
            React.createElement(NavBar, { pages: this.props.params.pages }),
            this.props.children
        );
    }
});