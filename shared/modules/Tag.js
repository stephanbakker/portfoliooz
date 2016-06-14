import React from 'react'; 

export default React.createClass({
    render() {
        console.log(this.props, ' for tag');
        console.log(this.props.active === this.props.tag, ' is Current');
        const clName = `${this.props.tag === this.props.active ? 'active' : ''} tag-filter`;
        return <button {...this.props} className={clName}>{this.props.tag}</button>
    }
});

