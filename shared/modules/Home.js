import React from 'react';

class Home extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        document.title = document.title.replace(/^[^-]*/, 'Home');
    }
    render() {
        return(
            <h2>Home</h2>
        );
    }
}

export default Home;
