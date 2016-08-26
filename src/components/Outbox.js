import React from 'react';
import OutboxRow from './OutboxRow';

const createRow = (app, outbox, handleChange) => (
  outbox.map((item, key) => <OutboxRow app={app} idx={key} key={key} handleChange={handleChange}/>)
);

const Outbox = ({app, outbox, handleChange}) => (
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
    {createRow(app, outbox, handleChange)}
    </tbody>
  </table>
);

export default Outbox;
