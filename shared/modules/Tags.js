'use strict';

import React from 'react';
import Tag from './Tag';

module.exports = React.createClass({

    statics: { 
        getTags,
        getTagsFromPhoto
    },

    render() {
        let tags = getTags(this.props.photos).map((tag, index) => {
                        let isCurrent = tag === this.props.current;
                        return (
                            <li key={'tag' + index}>
                                <Tag
                                    onClick={this.setFilter(tag)}
                                    tag={tag}
                                    active={isCurrent}/>
                            </li>
                        );
                    });

        return (
           <ul className="tags">
                {tags}
            </ul>
        )
    },

    setFilter(tag) {
        return (evt => this.props.update(tag));
    }

});

function getTags(photos) {
    return getUniqueTags(photos);
}

function getUniqueTags(photos) {
    return photos.reduce(reduceTags, []).filter(uniq);
}

function reduceTags(acumulator, photo) {
    return acumulator.concat(getTagsFromPhoto(photo.tags));
}

function getTagsFromPhoto(tags) {
    return tags
            .split(' ')
            .filter(tag => tag !== '');
}

function uniq(item, index, array) {
    return array.indexOf(item) === index;
}
