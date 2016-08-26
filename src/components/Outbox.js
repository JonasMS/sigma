import React from 'react';
import OutboxRow from './OutboxRow';

const createRow = (state, handleChange, handleCheck) => (
  state.outbox.map((item, key) => (
    <OutboxRow
      state={state}
      idx={key}
      handleChange={handleChange}
      handleCheck={handleCheck}
      key={key}
    />
    ))
);

const Outbox = ({state, handleChange, handleCheck}) => (
  <table>
    <thead>
      <tr>
        <th></th>
        <th>First</th>
        <th>Last</th>
        <th>Email</th>
        <th>Merit</th>
      </tr>
    </thead>
    <tbody>
    {createRow(state, handleChange, handleCheck)}
    </tbody>
  </table>
);

export default Outbox;
