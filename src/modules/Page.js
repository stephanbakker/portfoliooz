import React from 'react';
import Photos from './Photos';

export default React.createClass({
  render() {
      return(
        <div>
            <h1>{this.props.page}</h1>
            <div dangerouslySetInnerHTML={{__html: this.props.params.pageContent.html}} />
            <div>{this.props.params.pageContent.photos.length}</div>
            <Photos photos={this.props.params.pageContent.photos}/>
        </div>
      )
  }
})
