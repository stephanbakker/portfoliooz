'use strict'; 
import React from 'react';

module.exports = React.createClass({

    getInitialState() {
        return {
            isActive: false
        }
    },

    static: {
        expand() {
            console.log('expand hallo');
        },

        collapse() {
            console.log('collapse hallo');
        },
    },

    componentDidUpdate(prevProps, prevState) {
        // after render
        console.log('clicked and now: ', this.state.isActive);
        console.log('isActive was %s, and is now %s', prevState.isActive, this.state.isActive);
    },

    render() {
        let description = this.state.isActive ? <p>{this.props.data.title}</p> : '';
        let imgSrc = this.state.isActive ? this.props.data.url_o : this.props.data.url_t;

        return (
            <div onClick={this.props.onClick}
                    className="item__wrapper">
                <img src={imgSrc}  />
                {description}
            </div>
        );
    }

});
