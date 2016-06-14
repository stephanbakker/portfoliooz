'use strict'; 
import React from 'react';
import { browserHistory } from 'react-router';
import Photo from './Photo';
import Tag from './Tag';

module.exports = React.createClass({

    componentDidMount() {
        document.title = document.title.replace(/^[^-]*/, this.props.currentPage);
    },

    getInitialState() {
        return {
            activeIndex: -1,
            tagIndex: 0,
            currentTag: getTags(this.props.photos).shift()
        }
    },

    render() {
        let tags = getTags(this.props.photos).map((tag, index) => {
            return (<Tag onClick={this.setFilter(tag)} key={'tag' + index} tag={tag}/>);
        });

        let results = this.props.photos
            .filter(photo => getTagsFromPhoto(photo.tags).indexOf(this.state.currentTag) > -1)
            .map((photo, index) => {
                const key = 'p' + index;

                return(
                        <li key={key} className='overview__item'>
                            <Photo onClick={this.toggle(index)} data={photo} ref={'photo' + index}/>
                        </li>
                    )
                }
            );

        return (
            <div>
                {tags}
                <ul className="overview">
                    {results}
                </ul>
            </div>
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

    setFilter(tag) {
        return evt => {
            console.log(tag)
            this.setState({
                currentTag: tag
            });
        }
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

