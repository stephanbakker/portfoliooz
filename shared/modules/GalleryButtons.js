import React from 'react';
export default React.createClass({
    render() {
        const styles = {display: this.props.show ? '' : 'none'};
        console.log('en nu?', this.props.show);
        return (
            <div style={styles}>
                <button
                    aria-label="close"
                    className="gallery-btn__close"
                    onClick={this.props.collapse}></button>
                <button
                    className="gallery-btn__arrow gallery-btn__arrow--previous"
                    onClick={this.props.previous}>previous</button>
                <button
                    className="gallery-btn__arrow gallery-btn__arrow--next"
                    onClick={this.props.next}>next</button>
            </div>
        );
    }
});
