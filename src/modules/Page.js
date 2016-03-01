import React from 'react';
import Photos from './Photos';

export default React.createClass({
  render() {
      let pageTitle = this.props.params.page;

      let pagesData = this.props.params.pages || window.__initialProps__.params.pages;

      let pageContent = pagesData.find(page => {
          return page.title === pageTitle;
      });

      return(
        <div>
            <h1>{pageContent.title}</h1>
            <div dangerouslySetInnerHTML={{__html: pageContent.html}} />
            <div>{pageContent.photos.length}</div>
            <Photos photos={pageContent.photos}/>
        </div>
      )
  }
})
