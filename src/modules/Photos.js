'use strict'; 
import React from 'react';
import { browserHistory } from 'react-router';
import Photo from './Photo';

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
    },

    componentWillUpdate(nextProps, nextState) {
    },

    render() {
        let results = this.props.photos.map((photo, index) => {
            const key = 'p' + index;

            return(
                    <li key={key} className='overview__item'>
                        <Photo onClick={this.toggle(index)} data={photo} ref={'photo' + index}/>
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
            const photo = this.refs['photo' + index];
            if (this.state.activeIndex === index) {
                photo.setState({isActive: false});
                this.setState({
                    activeIndex: -1
                });
            } else {
                photo.setState({isActive: true});
                this.setState({
                    activeIndex: index
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

