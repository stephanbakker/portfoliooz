'use strict'; 

import React from 'react';
import { browserHistory } from 'react-router';
import toggleItem from '../gallery';

export default React.createClass({
    getInitialState() {
        return {};
    },
    componentDidMount() {
        const activePhoto = this.props.currentPhoto;
        console.log('componentDidMount with props', this.props);
        this.setState({active: true});
        toggleItem(!!activePhoto && this._item);
    },
    render() {
        const photo = this.props.photo;
        const currentPage = this.props.currentPage;
        const className = (this.state.active ? 'is-active' : '') + 'overview__item';

        return(
            <li className={className}>
                <div onClick={this.openItem(photo.title, currentPage)} 
                        className="item__wrapper"
                        ref={(item) => this._item = item}>
                    <img src={photo.url_s}/>
                </div>
            </li>
        );
    },
    openItem(photo, currentPage) {
        return (evt) => {
            toggleItem(this._item);
        }
    }
});
