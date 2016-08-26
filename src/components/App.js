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
      inputErrors: [],
    }

    this.updateDB = this.updateDB.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleSend = this.handleSend.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

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

  updateDB(outbox) {
    fetch('http://localhost:3000/outbox', createPOST(
      Object.assign({}, { outbox, merits: this.state.merits })
    ));
  }

  // handle changes to values of table cells
  handleFieldChange(e, idx, prop) {
    // make copies of values in order to maintain immutable changes
    const outboxItem = Object.assign({}, this.state.outbox[idx]);
    outboxItem[prop] = e.target.value;

    const outbox = this.state.outbox.slice(0);
    outbox[idx] = outboxItem;

    this.setState({ outbox });
    this.updateDB(outbox);
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
      checked = this.state.checked.slice().splice(targetIdx, 1);
      this.setState({ checked })
      return;
    }

    return;
  }

  handleSend() {
    // check each cell of each checked row for validity
    let row;
    let rowErrs;
    const inputErrors = this.state.checked.reduce((errors, item) => {
      row = this.state.outbox[item];

      // return array of properties that have invalid values
      rowErrs = Object.keys(row).reduce((propErrs, prop) => {
        if (!row[prop].length) {
          propErrs.push(prop);
        }
        return propErrs;
      }, [])

      if (rowErrs.length) {
        errors.push({ idx: item, props: rowErrs });
      }

      return errors;
    }, []);

      // handle errors
    if (inputErrors.length) {
      this.setState({ inputErrors });
      return;
    }

    // log out 'sent' items
    this.state.checked.forEach(item => {
      console.log('SENT ITEM: ', this.state.outbox[item]);
    });

    this.handleDelete();
  }

  handleDelete() {
    // worst case: linear time & space
    // in many cases, much better than removing indexes in 'checked' from outbox array

    let toDelete = 0; // to keep track of value in checked to compare against
    const checked = this.state.checked.slice().sort((a, b) => a > b); // sort, could be out of order
    const outbox = this.state.outbox.reduce((filtered, item, idx) => {
      if (idx === checked[toDelete]) {
        toDelete++;
        return filtered;
      }
      filtered.push(item);
      return filtered;
    }, []);

    this.setState({ outbox, checked: [] });
    this.updateDB(outbox);
  }

  render() {
    console.log('state: ', this.state);
    return (
      <div className="App">
        <div className="buttons">
          <button className="delete" onClick={this.handleDelete}>Delete</button>
          <button className="send" onClick={this.handleSend}>Send</button>
        </div>
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
