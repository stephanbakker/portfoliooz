'use strict'; 
import React from 'react';
import { browserHistory } from 'react-router';
import Photo from './Photo';

module.exports = React.createClass({

    componentDidMount() {
        console.log(document.title);
        console.log(document.title.replace(/^[^-]*/, this.props.params.page));
        document.title = document.title.replace(/^[^-]*/, this.props.params.page);
    },

    getInitialState() {
        return {
            activeIndex: -1
        }
    },

    render() {
        let results = this.props.photos.map((photo, index) => {
            const key = 'p' + index;

            return(
                    <li key={key} className='overview__item'>
                        <Photo onClick={this.toggle(index)} data={photo} ref={'photo' + index}/>
                    </li>
                )
            }
        );

        return (
            <ul className="overview">
                {results}
            </ul>
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
    }

});

