'use strict';

var React = require('react');

module.exports = React.createClass({
    displayName: 'exports',


    render: function render() {
        var results = this.props.photos.map(function (photo) {
            return React.createElement(
                'div',
                { className: 'photos__item' },
                React.createElement('img', { src: photo.url_s })
            );
        });
        return React.createElement(
            'div',
            { className: 'photos' },
            results
        );
    }

});