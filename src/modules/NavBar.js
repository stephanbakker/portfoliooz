import React from 'react'; 
import NavLink from './NavLink';

export default React.createClass({
    render() {
        let pages = this.props.pages || (window && window.__initialProps__.params.pages);

        return (
            <ul> 
                {
                    pages.map((page) => {
                        return (
                            <li key={page.title}>
                                <NavLink to={page.title}>{page.title}</NavLink>
                            </li>
                        );
                    })
                } 
            </ul>
        );
    }
});
