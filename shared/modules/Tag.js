import React from 'react'; 

export default React.createClass({
    render() {
        console.log(this.props, ' for tag');
        return <button {...this.props} className="tag-filter">{this.props.tag}</button>
    }
});

