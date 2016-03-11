'use strict'; 
import React from 'react';
import { browserHistory } from 'react-router';

module.exports = React.createClass({

    getInitialState() {
        return {
            activeIndex: -1,
            activeEl: null
        }
    },

    componentWillMount() {
    },

    componentDidUpdate(prevProps, prevState) {
        // after render
        if (this.state.activeIndex > -1) {
            this.expand();
        }
    },

    componentWillUpdate(nextProps, nextState) {
        // before state change and render
        if (nextState.activeIndex > -1) {
            this.setupExpand(nextState.activeEl); 
        } 
    },

    render() {
        let results = this.props.photos.map((photo, index) => {
            const key = 'p' + index;
            const isActive = this.state.activeIndex === index;
            const imgSrc = isActive ? photo.url_o : photo.url_t;
            const className = (isActive ? 'is-expanded' : '') + ' item__wrapper';

            let description = isActive ? <p>{photo.title}</p> : '';

            return(
                    <li key={key} className='overview__item'>
                        <div onClick={this.toggle(index)} 
                                className={className}>
                            <img src={imgSrc} ref={(ref) => this['image_' + index] = ref}/>
                            {description}
                        </div>
                    </li>
                )
            }
        );

        return (
            <ul className="overview">
                {results}
            </ul>
        )
    },

    toggle(index) {
        return (evt) => {
            if (this.state.activeIndex === index) {
                this.shrink(evt.currentTarget, index);
            } else {
                this.setState({
                    activeIndex: index,
                    activeEl: evt.currentTarget
                });
            }
        }
    },

    setupExpand(item) {
        item.rects = item.getBoundingClientRect();
    },

    expand() {
        const item = this.state.activeEl;
        const index = this.state.activeIndex;
        console.log(this['image_' + index]);
        console.log('rects item', item.rects);
        const image = this['image_' + index];

       // use image props to set scale, translate to former position
       // and translate back to full scale/middle position
       // image.style.transform = 'scale

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

        //browserHistory.push('/' + this.props.currentPage);
        item.removeEventListener('transitionend', this.transitionCollapseEnd);
    }

});

