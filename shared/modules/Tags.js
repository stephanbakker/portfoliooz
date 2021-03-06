'use strict';

import React from 'react';
import Tag from './Tag';

class Tags extends React.Component {
  constructor(props) {
    super(props);
    this.setFilter = this.setFilter.bind(this);
  }
  componentWillUnMount() {
    this.setProps({current: ''});
  }
  static getTags(photos) {
    return getUniqueTags(photos);
  }
  static getTagsFromPhoto(tags) {
    return tags
      .split(' ')
      .filter(tag => tag !== '');
  }
  render() {
    let tags = Tags.getTags(this.props.photos).map((tag, index) => {
      let isCurrent = tag === this.props.current;
      return (
        <li className="tags__item"
          key={'tag' + index}
          onClick={() => this.setFilter(tag)}>
          <Tag
            tag={tag}
            active={isCurrent} />
        </li>
      );
    });
    if (tags.length > 0) {
      let all = <li className="tags__item" key={'tag-all'} onClick={() => this.setFilter('')}>
                  <Tag tag="" active={this.props.current === ''}/>
                </li>;

      tags.push(all);
    }

    return (
      <ul className="tags">
        {tags}
      </ul>
    );
  }
  setFilter(tag) {
    // const isActive = this.props.current === tag;
    this.props.update(tag);
  }
}

export default Tags;

function getUniqueTags(photos) {
  return photos
          .reduce(reduceTags, [])
          .filter(uniq)
          .sort()
          .reverse();
}

function reduceTags(acumulator, photo) {
  return acumulator.concat(Tags.getTagsFromPhoto(photo.tags));
}

function uniq(item, index, array) {
  return array.indexOf(item) === index;
}
