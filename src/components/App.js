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
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
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

  // handle changes to values of table cells
  handleFieldChange(e, idx, prop) {
    // make copies of values in order to maintain immutable changes
    const outboxItem = Object.assign({}, this.state.outbox[idx]);
    outboxItem[prop] = e.target.value;

    const outbox = this.state.outbox.slice(0);
    outbox[idx] = outboxItem;

    this.setState({ outbox });
    return;
  }

  // handle checking / unchecking of boxes
  handleCheckboxChange(e, idx) {
    let targetIdx;
    let checked;

    // add handle to state.checked
    if (e.target.checked) {
      checked = this.state.checked.concat(idx);
      this.setState({ checked })
      return;
    }

    // remove handle from state.check
    targetIdx = this.state.checked.indexOf(idx);
    if (targetIdx > -1) {
      checked =  this.state.checked.slice().splice(targetIdx, 1);
      this.setState({ checked })
      return;
    }

    return;
  }

  render() {
    console.log('state: ', this.state);
    return (
      <div className="App">
        <Outbox
          app={this}
          outbox={this.state.outbox}
          handleChange={this.handleFieldChange}
          handleCheck={this.handleCheckboxChange}
        />
      </div>
    );
  }
}

export default App;
