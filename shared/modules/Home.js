import React from 'react';

const TITLE = 'home';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    document.title = TITLE;
  }
  render() {
    let pagesData = this.props.params.pages || window.__initialProps__.params.pages;

    let pageContent = pagesData.find(page => {
      return page.title === TITLE;
    });

    return (
        <div className="content__text"
            dangerouslySetInnerHTML={{__html: pageContent.html}} />
    );
  }
}

export default Home;
