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
      checkboxes: [],
      merits: [],
      checked: [],
      inputErrors: {},
    }

    this.updateDB = this.updateDB.bind(this);
    this.hasError = this.hasError.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
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
        const checkboxes = outbox.map(() => false);
        this.setState({merits, outbox, checkboxes});
      });
  }

  updateDB(outbox) {
    fetch('http://localhost:3000/outbox', createPOST(
      Object.assign({}, { outbox, merits: this.state.merits })
    ));
  }

  hasError(idx, prop) {
    const { inputErrors } = this.state;
    return inputErrors[idx] && inputErrors[idx][prop];
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

    const checkboxes = this.state.checkboxes.slice();
    checkboxes[idx] = !checkboxes[idx]; // flip value of checkbox

    // add handle to state.checked
    if (e.target.checked) { // TODO: use checkboxes instead of e.target
      checked = this.state.checked.concat(idx);
      this.setState({ checked, checkboxes })
      return;
    }

    // remove handle from state.check
    targetIdx = this.state.checked.indexOf(idx);
    if (targetIdx > -1) {
      checked = this.state.checked.slice().splice(targetIdx, 1);
      this.setState({ checked, checkboxes })
      return;
    }

    this.setState({ checkboxes });
  }

  handleAdd() {
    const { outbox } = this.state;
    this.setState({ outbox: outbox.concat({ first: "", last: "", email: "", merit: "" }) });
  }

  handleSend() {
    // handle errors
    // check each cell of each checked row for validity
    let row;
    let rowErrs;
    const { outbox } = this.state;
    const inputErrors = this.state.checked.reduce((errors, item) => {
      row = outbox[item];

      // return array of properties that have invalid values
      rowErrs = Object.keys(row).reduce((propErrs, prop) => {
        if (!row[prop].length) { // checking length of input field value
          propErrs[prop] = 1;
        }
        return propErrs;
      }, {})

      if (Object.keys(rowErrs).length) {
        errors[item] = rowErrs;
      }

      return errors;
    }, {});

    if (Object.keys(inputErrors).length) {
      this.setState({ inputErrors });
      return;
    }

    // log out 'sent' items
    this.state.checked.forEach(item => {
      console.log('SENT ITEM: ', outbox[item]);
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

    const checkboxes = outbox.map(() => false);
    this.setState({ outbox, checkboxes, checked: [] });
    this.updateDB(outbox);
  }

  render() {
    console.log('state: ', this.state);
    return (
      <div className="App">
        <div className="buttons">
          <button className="btn add-btn" onClick={this.handleAdd}>Add</button>
          <button className="btn delete-btn" onClick={this.handleDelete}>Delete</button>
          <button className="btn send-btn" onClick={this.handleSend}>Send</button>
        </div>
        <Outbox
          state={this.state}
          handleChange={this.handleFieldChange}
          handleCheck={this.handleCheckboxChange}
          hasError={this.hasError}
        />
      </div>
    );
  }
}

export default App;
