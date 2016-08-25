import React from 'react';
import OutboxRow from './OutboxRow';

const createRow = (app, outbox) => (
  outbox.map(item => <OutboxRow item={item} />)
);

const Outbox = ({app, outbox}) => (
  <table>
    <tr>
      <th>First</th>
      <th>Last</th>
      <th>Email</th>
      <th>Merit</th>
    </tr>
    {createRow(app, outbox)}
  </table>
);

export default Outbox;
