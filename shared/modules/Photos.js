import React from 'react';
import Photo from './Photo';
import Tags from './Tags';
import GalleryButtons from './GalleryButtons';

class Photos extends React.Component {
  constructor(props) {
    super(props);
    const currentTag = Tags.getTags(this.props.photos).shift();
    const currentPhotos = this.getPhotosWithTag(this.props.photos, currentTag);

    this.state = {
      activeIndex: -1,
      tagIndex: 0,
      currentTag,
      currentPhotos
    };

    this.toggle = this.toggle.bind(this);
    this.collapse = this.collapse.bind(this);
    this.updateTag = this.updateTag.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const currentTag = Tags.getTags(nextProps.photos).shift();
    this.setState({
      currentTag: currentTag,
      currentPhotos: this.getPhotosWithTag(nextProps.photos, currentTag)
    });
  }

  componentDidMount() {
    window.addEventListener("keyup", this.handleKeyUp.bind(this));
  }

  componentWillUnMount() {
    window.removeEventListener("keyup", this.handleKeyUp.bind(this));
  }

  render() {
    let thumbs = this.state.currentPhotos.map((photo, index) => {
      const key = 'p' + index;
      return (
        <li key={key} className="overview__item">
          <Photo
            onClick={this.toggle(index)}
            data={photo}
            ref={'photo' + index} />
        </li>
      );
    });

    const showButtons = this.state.activeIndex !== -1;
    return (
      <div>
        <Tags
          photos={this.props.photos}
          update={this.updateTag}
          current={this.state.currentTag} />
        <ul className="overview">
          {thumbs}
        </ul>
        <GalleryButtons
          show={showButtons}
          collapse={this.collapse}
          next={this.next}
          previous={this.previous} />
      </div>
    );
  }

  toggle(index) {
    return function togglePhoto(evt) {
      evt.preventDefault();
      if (this.state.activeIndex === index) {
        this.collapse({ transition: 'zoom' });
      } else {
        this.expand(index, { transition: 'zoom' });
      }
    }.bind(this);
  }

  collapse(config) {
    const photo = this.refs['photo' + this.state.activeIndex];
    if (photo) {
      photo.setState({
        isActive: false,
        transition: config.transition
      });
    }
    this.setState({
      activeIndex: -1
    });
  }

  expand(index, config) {
    const photo = this.refs['photo' + index];
    if (photo) {
      photo.setState({
        isActive: true,
        transition: config.transition
      });
    }
    this.setState({
      activeIndex: index
    });
  }

  next() {
    let next = this.state.activeIndex + 1;
    if (this.state.currentPhotos.length === next) {
      this.collapse({ transition: 'zoom' });
      return;
    }
    this.collapse({ transition: 'opacity' });
    this.expand(next, { transition: 'opacity' });
  }

  previous() {
    const previous = this.state.activeIndex - 1;
    if (previous < 0) {
      this.collapse({ transition: 'zoom' });
      return;
    }
    this.collapse({ transition: 'opacity' });
    this.expand(previous, { transition: 'opacity' });
  }

  handleKeyUp(evt) {
    if (this.state.activeIndex < 0) {
      return;
    }

    switch (evt.which) {
      case 27: // Escape
        this.collapse({ transition: 'zoom' });
        break;
      case 39: // ArrowRight
        this.next();
        break;
      case 37: // ArrowLeft
        this.previous();
        break;
      default:
    }
  }

  updateTag(tag) {
    this.setState({
      currentTag: tag,
      currentPhotos: this.getPhotosWithTag(this.props.photos, tag)
    });
  }

  getPhotosWithTag(photos, tag) {
    let currentPhotos = tag ?
      photos.filter(photo => this.filterTaggedPhotos(photo, tag)) :
      photos;

    return currentPhotos;
  }

  updateCurrentPhotos(tag) {
    let currentPhotos = this.getPhotosWithTag(this.props.photos, tag);

    this.setState({ currentPhotos });
  }

  filterTaggedPhotos(photo, tag) {
    return Tags
      .getTagsFromPhoto(photo.tags)
      .indexOf(tag) > -1;
  }

}

export default Photos;

