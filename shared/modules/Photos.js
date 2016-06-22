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
        let results = this.props.photos
            .filter(photo => Tags.getTagsFromPhoto(photo.tags).indexOf(this.state.currentTag) > -1)
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
            currentTag: tag
        });
    }

});

