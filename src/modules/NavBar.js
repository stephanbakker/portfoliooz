import React from 'react'; 
import NavLink from './NavLink';

export default React.createClass({
    render() {
        let pages = this.props.pages || (window && window.__initialProps__.params.pages);

        return (
            <nav>
                <ul className="nav"> 
                    {
                        pages.map((page) => {
                            return (
                                <li className="nav__item" key={page.title}>
                                    <NavLink to={page.title}>{page.title}</NavLink>
                                </li>
                            );
                        })
                    } 
                </ul>
            </nav>
        );
    }
});
