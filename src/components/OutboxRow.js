import React from 'react';

const OutboxRow = ({item}) => (
  <tr>
    <td>{item.first}</td>
    <td>{item.last}</td>
    <td>{item.email}</td>
    <td>{item.merit}</td>
  </tr>
);

export default OutboxRow;
