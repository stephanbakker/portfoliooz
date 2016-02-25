'use strict';

const React = require('react');

module.exports = React.createClass({
    displayName: 'exports',


    render: function () {
        let results = this.props.photos.map(photo => React.createElement(
            'div',
            { className: 'photos__item' },
            React.createElement('img', { src: photo.url_s })
        ));
        return React.createElement(
            'div',
            { className: 'photos' },
            results
        );
    }

});