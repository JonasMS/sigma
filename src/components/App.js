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
    this.handleFieldChange = this.handleFieldChange.bind(this);
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

  handleFieldChange(e, idx, prop) {
    // make copies of values in order to maintain immutable changes
    const outboxItem = Object.assign({}, this.state.outbox[idx]);
    outboxItem[prop] = e.target.value;

    const outbox = this.state.outbox.slice(0);
    outbox[idx] = outboxItem;

    this.setState({outbox});
  }

  render() {
    console.log('state: ', this.state);
    return (
      <div className="App">
        <Outbox app={this} outbox={this.state.outbox} handleChange={this.handleFieldChange}/>
      </div>
    );
  }
}

export default App;
