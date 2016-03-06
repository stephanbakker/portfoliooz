'use strict'; 
import React from 'react';
import { browserHistory } from 'react-router';
import toggleItem from '../gallery';

module.exports = React.createClass({
    getInitialState() {
        return {
            activeIndex: -1,
            activeEl: null
        }
    },
    componenDidUpdate() {
        console.log('componentDidUpdate', this.activeEl);
    },
    render() {
        let results = this.props.photos.map((photo, index) => {
            const key = 'p' + index;
            const imgSrc = this.state.activeIndex === index ? photo.url_m : photo.url_s;

            return(
                    <li key={key} className='overview__item'>
                        <div onClick={this.toggle(index)} 
                                className="item__wrapper">
                            <img src={imgSrc}/>
                        </div>
                    </li>
                );
            }
        );

        return (
            <ul className="overview">
                {results}
            </ul>
        );
    },

    toggle(index) {
        return (evt) => {
            if (this.state.activeIndex === index) {
                this.close(evt.currentTarget, index);
            } else {
                this.show(evt.currentTarget, index);
            }
        }
    },

    show(item, index) {

        // get rects first
        if (this.state.activeEl) {
            close(this.state.activeEl);
        }

        // add className via state rerender
        this.setState({
            activeIndex: index,
            activeEl: item
        });

        item.rects = item.getBoundingClientRect();

        item.classList.add('is-extended');
        // rerender to fullscreen

        let expandedRects = item.getBoundingClientRect();

        item.style.clip = 'rect(' +
            item.rects.top + 'px, ' +
            item.rects.right + 'px, ' +
            item.rects.bottom + 'px, ' +
            item.rects.left + 'px)';

        // Read again to force the style change to take hold.
        var triggerValue = item.offsetTop;

        item.style.clip = 'rect(' +
            expandedRects.top + 'px, ' +
            expandedRects.right + 'px, ' +
            expandedRects.bottom + 'px, ' +
            expandedRects.left + 'px)';
    },

    close(item) {
        item.style.clip = 'rect(' +
            item.rects.top + 'px, ' +
            item.rects.right + 'px, ' +
            item.rects.bottom + 'px, ' +
            item.rects.left + 'px)';

        item.addEventListener('transitionend', this.transitionCollapseEnd);

        this.setState({
            activeIndex: -1,
            activeEl: null
        });
    },

    transitionCollapseEnd(evt) {
        var item = evt.target;

        item.classList.remove('is-extended');
        item.removeEventListener('transitionend', this.transitionCollapseEnd);
    }

});

