import React from 'react';

export default React.createClass({
    componentDidMount() {
        document.title = document.title.replace(/^[^-]*/, 'Home');
    },
    render() {
        return(
            <h2>Home</h2>
        );
    }
})

