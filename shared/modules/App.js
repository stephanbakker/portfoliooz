import React from 'react';
import NavBar from './NavBar';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>Marit Dik</h1>
        {<NavBar pages={this.props.params.pages} />}
        {this.props.children}
      </div>
    );
  }
}

export default App;
