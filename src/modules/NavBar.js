import React from 'react'; 
import NavLink from './NavLink';

export default React.createClass({
    render() {
        return (
            <ul> {
                this.props.pages.map((page) => {
                    return (
                        <li key={page.title}>
                            <NavLink to={page.title}>{page.title}</NavLink>
                        </li>
                    );
                })
            } </ul>
        );
    }
});
