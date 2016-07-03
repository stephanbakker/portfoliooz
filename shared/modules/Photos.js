'use strict';
import React from 'react';
import { browserHistory } from 'react-router';
import Photo from './Photo';
import Tag from './Tag';
import Tags from './Tags';
import GalleryButtons from './GalleryButtons';

module.exports = React.createClass({

    componentDidMount() {
        document.title = document.title.replace(/^[^-]*/, this.props.currentPage);
        window.addEventListener("keyup", this.handleKeyUp);
    },

    componentWillUnMount() {
        window.removeEventListener("keyup", this.handleKeyUp);
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

        let thumbs = photos.map((photo, index) => {
            const key = 'p' + index;
            return(
                    <li key={key} className='overview__item'>
                        <Photo
                            onClick={this.toggle(index)}
                            data={photo}
                            ref={'photo' + index}/>
                    </li>
                )
            }
        );

        const showButtons = this.state.activeIndex !== -1;
        return (
            <div>
                <Tags photos={this.props.photos} update={this.updateTag} current={this.state.currentTag}/>
                <ul className="overview">
                    {thumbs}
                </ul>
                <GalleryButtons
                    show={showButtons}
                    collapse={this.collapse}
                    next={this.next}
                    previous={this.previous} />
            </div>
        )
    },

    toggle(index) {
        return (evt) => {
            evt.preventDefault();
            if (this.state.activeIndex === index) {
                this.collapse();
            } else {
                this.expand(index);
            }
        }
    },

    collapse() {
        const photo = this.refs['photo' + this.state.activeIndex]
        if (photo) {
            photo.setState({isActive: false});
        }
        this.setState({
            activeIndex: -1
        });
    },

    expand(index) {
        const photo = this.refs['photo' + index];
        if (photo) {
            photo.setState({isActive: true});
        }
        this.setState({
            activeIndex: index
        });
    },

    next() {
        let next = this.state.activeIndex + 1;
        if (this.props.photos.length === next) {
            next = -1;
        }
        this.collapse();
        this.expand(next);
    },

    previous() {
        const previous = this.state.activeIndex - 1;
        this.collapse();
        this.expand(previous);
    },

    handleKeyUp(evt) {
        console.log(evt);
        if (this.state.activeIndex < 0) {
            return;
        }

        switch (evt.code) {
            case 'Escape':
                this.collapse();
                break;
            case 'ArrowRight':
                this.next();
                break;
            case 'ArrowLeft':
                this.previous();
                break;
            default:
                console.log(evt.which);
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
