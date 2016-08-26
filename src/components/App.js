import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
require('es6-promise').polyfill();
import Outbox from './Outbox';
import {
  checkStatus,
  parseJSON,
  createPOST,
} from '../modules/';
import {
  setAll,
  removeError,
  setErrors,
  updateOutbox,
  updateCheckboxes,
  addOutboxEntry,
} from '../actions/';
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
    this.handleCheckAll = this.handleCheckAll.bind(this);
  }

  componentDidMount() {
    fetch('http://localhost:3000/outbox')
      .then(checkStatus)
      .then(parseJSON)
      .then(data => {
        const { merits, outbox } = data;
        const checkboxes = outbox.map(() => false);
        setAll(this, outbox, checkboxes, merits);
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

  handleFieldChange(e, idx, prop) {
    // handle updating state.outbox
    const outboxItem = Object.assign({}, this.state.outbox[idx]);
    outboxItem[prop] = e.target.value;

    const outbox = this.state.outbox.slice(0);
    outbox[idx] = outboxItem;

    // If row of changed field has an error, remove error
    if (this.state.inputErrors[idx]) {
      removeError(this, idx);
    }

    updateOutbox(this, outbox, this.state.merits);
    return;
  }

  handleCheckAll(e) {
    let checkboxes;
    let checked;

    if (e.target.checked) {
      checkboxes = this.state.checkboxes.map(() => true);
      checked = this.state.outbox.map((item, idx) => idx);
      updateCheckboxes(this, checkboxes, checked);
      return;
    }

    checkboxes = this.state.checkboxes.map(() => false);
    updateCheckboxes(this, checkboxes, []);
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
      updateCheckboxes(this, checkboxes, checked);
      return;
    }

    if (this.state.inputErrors[idx]) {
      removeError(this, idx);
    }

    // remove handle from state.checked
    checked = checkboxes.reduce((allTrues, box, index) => { // TODO: think about
      if (box) {
        allTrues.push(index);
      }
      return allTrues;
    }, []);

    updateCheckboxes(this, checkboxes, checked);
  }

  handleAdd() {
    addOutboxEntry(this, { first: "", last: "", email: "", merit: "" });
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
      setErrors(this, inputErrors);
      return;
    }

    // log out 'sent' items
    this.state.checked.forEach(item => {
      console.log('SENT ITEM: ', outbox[item]);
    });

    this.handleDelete();
  }

  handleDelete() { // TODO: remove error
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
    updateOutbox(this, outbox);
    updateCheckboxes(this, checkboxes, []);
  }

  render() {
    console.log('state: ', this.state);
    return (
      <div className="App">
        <div className="buttons">
          <button className="btn add-btn" onClick={this.handleAdd}>Add</button>
          <button
            className="btn delete-btn"
            disabled={!this.state.checked.length}
            onClick={this.handleDelete}>Delete</button>
          <button
            className="btn send-btn"
            disabled={!this.state.checked.length}
            onClick={this.handleSend}>Send</button>
        </div>
        <Outbox
          state={this.state}
          handleChange={this.handleFieldChange}
          handleCheck={this.handleCheckboxChange}
          handleCheckAll={this.handleCheckAll}
          hasError={this.hasError}
        />
      </div>
    );
  }
}

export default App;
