import React from 'react';
import Photos from './Photos';

export default React.createClass({
    displayName: 'Page',

    render() {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'h1',
                null,
                this.props.page
            ),
            React.createElement('div', { dangerouslySetInnerHTML: { __html: this.props.params.pageContent.html } }),
            React.createElement(
                'div',
                null,
                this.props.params.pageContent.photos.length
            ),
            React.createElement(Photos, { photos: this.props.params.pageContent.photos })
        );
    }
});