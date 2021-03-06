'use strict';
import React from 'react';

class Photo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false
    };
    this.transitionCollapseEnd = this.transitionCollapseEnd.bind(this);
    this.expand = this.expand.bind(this);
    this.collapse = this.collapse.bind(this);
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.isActive) {
      this.expand();
    } else if (prevState.isActive) {
      this.collapse();
    }
  }
  render() {
    let description = this.state.isActive ?
      <div className="photo__descr">
        {this.props.data.title}
        <div className="photo__descr__sub"
          dangerouslySetInnerHTML={{ __html: this.props.data.description._content }} />
      </div> : '';

    let imgData = this.props.data;

    const wrapperClass = `item__wrapper ${this.state.transition || ''}`;
    return (
      <div
        {...this.props}
        ref={container => this._container = container}
        className={wrapperClass}>
        <img src={imgData.url_t} ref={thumb => this.thumb = thumb} />
        <div className="toggleContainer" ref={toggleContainer => this._toggleContainer = toggleContainer}>
          <span>
            <img src={imgData.url_l} ref={zoomed => this._zoomed = zoomed} />
          </span>
          {description}
        </div>
      </div>
    );
  }
  // custom
  expand() {
    const item = this._container;
    const toggleContainer = this._toggleContainer;

    const startRects = this.startRects = item.getBoundingClientRect();

    toggleContainer.classList.add('is-expanded');

    const expandedRects = toggleContainer.getBoundingClientRect();

    // make sure the zoomed image is not taking too much space
    // leaving some padding, and space for description
    this._zoomed.style.maxHeight = expandedRects.height - 100 + 'px';
    this._zoomed.style.maxWidth = expandedRects.width - 100 + 'px';

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
  }
  collapse() {
    const toggleContainer = this._toggleContainer;
    const startRects = this.startRects;

    toggleContainer.style.clip = 'rect(' +
      startRects.top + 'px, ' +
      startRects.right + 'px, ' +
      startRects.bottom + 'px, ' +
      startRects.left + 'px)';

    toggleContainer.addEventListener('transitionend', this.transitionCollapseEnd);

    if (this.state.transition === 'opacity') {
      this.transitionCollapseEnd();
    }
  }
  transitionCollapseEnd(evt) {
    const toggleContainer = this._toggleContainer;

    this.startRects = null;

    toggleContainer.classList.remove('is-expanded');

    toggleContainer.removeEventListener('transitionend', this.transitionCollapseEnd);
  }
  getImgStartTranslateValues(startRects, endRects) {
    return {
      top: startRects.top - endRects.top,
      left: startRects.left - endRects.left
    };
  }
}

export default Photo;
