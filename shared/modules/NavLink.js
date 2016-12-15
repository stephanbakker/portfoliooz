import React from 'react';
import {Link, IndexLink} from 'react-router';

class NavLink extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (this.props.to === '/' ?
      <IndexLink {...this.props} className="nav__item__link" activeClassName="is-active" /> :
      <Link {...this.props} className="nav__item__link" activeClassName="is-active" />
    );
  }
}

export default NavLink;

