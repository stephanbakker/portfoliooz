import React from 'react';
import Photos from './Photos';

class Page extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidUpdate() {
    document.title = document.title &&
      document.title.replace(/^[^-]*/, this.props.params.page.replace(/-/g, ' '));
  }
  render() {
    let pageTitle = this.props.params.page;

    let pagesData = this.props.params.pages || window.__initialProps__.params.pages;

    let pageContent = pagesData.find(page => {
      return page.title === pageTitle;
    });

    let photos = pageContent.photos &&
      <Photos photos={pageContent.photos}
        currentPage={this.props.params.page}
        currentPhoto={this.props.params.photo} />;

    return (
      <div className="content">
        <div className="content__text" dangerouslySetInnerHTML={{ __html: pageContent.html }} />
        {photos}
      </div>
    );
  }
}

export default Page;
