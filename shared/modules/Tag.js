import React from 'react';

class Tag extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const clName =
      `${this.props.active ? 'active' : ''} tags__item__filter`;

    return (<button className={clName}>
              {this.props.tag}
            </button>);
  }
}

export default Tag;

