'use strict'; 
const React = require('react');

module.exports = React.createClass({

    render: function () {
        let results = this.props.photos.map(photo => 
            <div className="photos__item"><img src={photo.url_s}/></div>
        );
        return (
            <div className="photos">
                {results}
            </div>
        );
    }

});

