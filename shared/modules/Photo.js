'use strict';
import React from 'react';

module.exports = React.createClass({

    getInitialState() {
        return {
            isActive: false
        }
    },

    componentDidUpdate(prevProps, prevState) {
        console.log('2. did update');
        if (this.state.isActive) {
            this.expand();
        } else if (prevState.isActive) {
            this.collapse();
        }
    },

    render() {
        let description = this.state.isActive ? <p>{this.props.data.title}</p> : '';
        let imgData = this.props.data;

        return (
            <div onClick={this.props.onClick}
                ref={container => this._container = container}
                    className="item__wrapper">
                <img src={imgData.url_t} ref={thumb => this.thumb = thumb}/>
                <div className="toggleContainer" ref={toggleContainer => this._toggleContainer = toggleContainer}>
                    <span>
                        <img src={imgData.url_o} ref={zoomed => this._zoomed = zoomed}/>
                    </span>
                    {description}
                </div>
            </div>
        );
    },

    // custom
    expand() {
        const item = this._container;
        const toggleContainer = this._toggleContainer;

        const startRects = this.startRects = item.getBoundingClientRect();

        toggleContainer.classList.add('is-expanded');

        const expandedRects = toggleContainer.getBoundingClientRect();

        toggleContainer.style.clip = 'rect(' +
            startRects.top + 'px, ' +
            startRects.right + 'px, ' +
            startRects.bottom + 'px, ' +
            startRects.left + 'px)';

        // Read again to force the style change to take hold.
        let triggerValue = toggleContainer.offsetTop;

        toggleContainer.style.clip = 'rect(' +
            expandedRects.top + 'px, ' +
            expandedRects.right + 'px, ' +
            expandedRects.bottom + 'px, ' +
            expandedRects.left + 'px)';
    },

    collapse() {
        const toggleContainer = this._toggleContainer;
        const startRects = this.startRects;

        toggleContainer.style.clip = 'rect(' +
            startRects.top + 'px, ' +
            startRects.right + 'px, ' +
            startRects.bottom + 'px, ' +
            startRects.left + 'px)';

        this._zoomed.classList.remove('zoom');

        toggleContainer.addEventListener('transitionend', this.transitionCollapseEnd);
    },

    transitionCollapseEnd(evt) {
        const toggleContainer = this._toggleContainer;

        this.startRects = null;

        toggleContainer.classList.remove('is-expanded');

        toggleContainer.removeEventListener('transitionend', this.transitionCollapseEnd);
    },

    getImgStartTranslateValues(startRects, endRects) {
        return {
            top: startRects.top - endRects.top, 
            left: startRects.left - endRects.left
        };
    }

});
