import React from 'react';

const OutboxRow = ({outbox, idx, handleChange, handleCheck}) => (
  <tr>
    <td><input type="checkbox" onChange={(e) => handleCheck(e, idx)} /></td>
    <td><input type="text" value={outbox[idx].first} onChange={(e) => handleChange(e, idx, 'first')} /></td>
    <td><input type="text" value={outbox[idx].last} onChange={(e) => handleChange(e, idx, 'last')}/></td>
    <td><input type="text" value={outbox[idx].email} onChange={(e) => handleChange(e, idx, 'email')} /></td>
    <td><input type="text" value={outbox[idx].merit} onChange={(e) => handleChange(e, idx, 'merit')} /></td>
  </tr>
);

export default OutboxRow;
