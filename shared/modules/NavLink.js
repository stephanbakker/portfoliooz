import React from 'react'; 
import {Link} from 'react-router';

export default React.createClass({
    render() {
        return <Link {...this.props} className="nav__item__link" activeClassName="is-active"/>
    }
});

