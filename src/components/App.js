import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
require('es6-promise').polyfill();
import Outbox from './Outbox';
import {
  checkStatus,
  parseJSON,
  createPOST,
} from '../modules/';
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

  componentDidMount() {
    fetch('http://localhost:3000/outbox')
      .then(checkStatus)
      .then(parseJSON)
      .then(data => {
        console.log(data);
        const { merits, outbox } = data;
        this.setState({merits, outbox});
      });
  }

  render() {
    console.log('state: ', this.state);
    return (
      <div className="App">
        <Outbox app={this} outbox={this.state.outbox} />
      </div>
    );
  }
}

export default App;
