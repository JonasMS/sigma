import React, { Component } from 'react';
import Outbox from './Outbox';
import '../styles/App.scss';

class App extends Component {
  constructor() {
    super();
    this.state = {
      outbox: [],
      merits: [],
      checked: [],
    }
  }

  render() {
    return (
      <div className="App">
        <Outbox app={this} outbox={this.state.outbox} />
      </div>
    );
  }
}

export default App;
