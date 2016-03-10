import React from 'react';
import NavLink from './NavLink';

export default React.createClass({
    displayName: 'NavBar',

    render() {
        return React.createElement(
            'ul',
            null,
            ' ',
            this.props.pages.map(page => {
                return React.createElement(
                    'li',
                    { key: page.title },
                    React.createElement(
                        NavLink,
                        { to: page.title },
                        page.title
                    )
                );
            }),
            ' '
        );
    }
});