import React from 'react';

class GalleryButtons extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const styles = {display: this.props.show ? '' : 'none'};
        return (
            <div style={styles}>
                <button
                    aria-label="close"
                    className="gallery-btn__close"
                    onClick={evt => this.props.collapse({transition: 'zoom'})}></button>
                <button
                    className="gallery-btn__arrow gallery-btn__arrow--previous"
                    onClick={this.props.previous}>previous</button>
                <button
                    className="gallery-btn__arrow gallery-btn__arrow--next"
                    onClick={this.props.next}>next</button>
            </div>
        );
    }
}

export default GalleryButtons;
