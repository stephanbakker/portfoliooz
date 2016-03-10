
'use strict';

const React = require('react');

module.exports = Item;

const Item = React.createClass({
    displayName: 'Item',


    render: function () {
        return React.createElement(
            'div',
            { 'class': 'item joo' },
            React.createElement(
                'span',
                { 'class': 'item foo' },
                this.props.photos
            )
        );
    }

});