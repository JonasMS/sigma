import React from 'react';

const OutboxRow = ({state, idx, handleChange, handleCheck}) => (
  <tr>
    <td><input type="checkbox" checked={state.checkboxes[idx]} onChange={(e) => handleCheck(e, idx)} /></td>
    <td><input type="text" value={state.outbox[idx].first} onChange={(e) => handleChange(e, idx, 'first')} /></td>
    <td><input type="text" value={state.outbox[idx].last} onChange={(e) => handleChange(e, idx, 'last')}/></td>
    <td><input type="text" value={state.outbox[idx].email} onChange={(e) => handleChange(e, idx, 'email')} /></td>
    <td><input type="text" value={state.outbox[idx].merit} onChange={(e) => handleChange(e, idx, 'merit')} /></td>
  </tr>
);

export default OutboxRow;
