import React from 'react';
import NavLink from './NavLink';

class NavBar extends React.Component {
  constructor(props) {
      super(props);
  }

  render() {
    let pages = this.props.pages || (window && window.__initialProps__.params.pages);

    return (
      <nav>
        <ul className="nav">
          {
            pages.map(page => {
                const humanTitle = page.title.replace(/-/g, ' ');
                return (
                    <li className="nav__item" key={page.title}>
                        <NavLink to={page.title}>{humanTitle}</NavLink>
                    </li>
                );
            })
          }
        </ul>
      </nav>
    );
  }
}

export default NavBar;
