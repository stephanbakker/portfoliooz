'use strict'; 
import React from 'react';
import { browserHistory } from 'react-router';
import Photo from './Photo';
import Tag from './Tag';
import Tags from './Tags';

module.exports = React.createClass({

    componentDidMount() {
        document.title = document.title.replace(/^[^-]*/, this.props.currentPage);
    },

    getInitialState() {
        return {
            activeIndex: -1,
            tagIndex: 0,
            currentTag: Tags.getTags(this.props.photos).shift()
        }
    },

    render() {
        let photos = this.state.currentTag ? 
                                this.props.photos
                                    .filter(photo => filterTaggedPhotos(photo, this.state.currentTag)) :
                                this.props.photos;

        let results = photos.map((photo, index) => {
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
                <Tags photos={this.props.photos} update={this.updateTag} current={this.state.currentTag}/>
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

    updateTag(tag) {
        this.setState({
            currentTag: this.state.currentTag !== tag ? tag : null
        });
    }

});


function filterTaggedPhotos(photo, tag) {
    return Tags
            .getTagsFromPhoto(photo.tags)
            .indexOf(tag) > -1;
}
