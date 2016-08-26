import React from 'react';
import OutboxRow from './OutboxRow';

const createRow = (outbox, handleChange, handleCheck) => (
  outbox.map((item, key) => (
    <OutboxRow
      outbox={outbox}
      idx={key}
      handleChange={handleChange}
      handleCheck={handleCheck}
      key={key}
    />
    ))
);

const Outbox = ({outbox, handleChange, handleCheck}) => (
  <table>
    <thead>
      <tr>
        <th>First</th>
        <th>Last</th>
        <th>Email</th>
        <th>Merit</th>
      </tr>
    </thead>
    <tbody>
    {createRow(outbox, handleChange, handleCheck)}
    </tbody>
  </table>
);

export default Outbox;
