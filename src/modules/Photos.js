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
    componentDidUpdate(prevProps, prevState) {
        // after render
        console.log('2. componentDidUpdate', this.state.activeEl);
        if (this.state.activeIndex > -1) {
            this.expand();
        }
    },
    componentWillUpdate() {
        // before render
        console.log('componentWillUpdate');
    },
    render() {
        let results = this.props.photos.map((photo, index) => {
            const key = 'p' + index;
            const isActive = this.state.activeIndex === index;
            const imgSrc = isActive ? photo.url_m : photo.url_s;
            const className = (isActive ? 'is-expanded' : '') + ' item__wrapper';

            return(
                    <li key={key} className='overview__item'>
                        <div onClick={this.toggle(index)} 
                                className={className}>
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
                this.shrink(evt.currentTarget, index);
            } else {
                this.setupExpand(evt.currentTarget, index);
            }
        }
    },

    setupExpand(item, index) {
        item.rects = item.getBoundingClientRect();

        // add className via state rerender
        // it will call expand after render
        this.setState({
            activeIndex: index,
            activeEl: item
        });
    },

    expand() {
        console.log('3. expand');
        // allways handled via state
        const item = this.state.activeEl;

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

    shrink(item) {
        item.style.clip = 'rect(' +
            item.rects.top + 'px, ' +
            item.rects.right + 'px, ' +
            item.rects.bottom + 'px, ' +
            item.rects.left + 'px)';

        item.addEventListener('transitionend', this.transitionCollapseEnd);

    },

    transitionCollapseEnd(evt) {
        var item = evt.target;

        this.setState({
            activeIndex: -1,
            activeEl: null
        });

        item.rects = null;

        item.removeEventListener('transitionend', this.transitionCollapseEnd);
    }

});

