import React from 'react'; 
import {Link} from 'react-router';

class NavLink extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <Link {...this.props} className="nav__item__link" activeClassName="is-active"/>
    }
}

export default NavLink;

