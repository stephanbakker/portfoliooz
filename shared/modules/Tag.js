import React from 'react'; 

export default React.createClass({
    render() {
        const clName = `${this.props.active ? 'active' : ''} tag-filter`;
        return <button {...this.props} className={clName}>{this.props.tag}</button>
    }
});

