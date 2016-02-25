
'use strict'; 
const React = require('react');

module.exports = Item;

const Item = React.createClass({

    render: function () {
        return (
            <div class="item joo">
                <span class="item foo">{this.props.photos}</span>
            </div>
        );
    }

});
