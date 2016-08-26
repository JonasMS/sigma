import React from 'react';

const OutboxRow = ({app, idx, handleChange}) => (
  <tr>
    <td><input type="text" value={app.state.outbox[idx].first} onChange={(e) => handleChange(e, idx, 'first')} /></td>
    <td><input type="text" value={app.state.outbox[idx].last} onChange={(e) => handleChange(e, idx, 'last')}/></td>
    <td><input type="text" value={app.state.outbox[idx].email} onChange={(e) => handleChange(e, idx, 'email')} /></td>
    <td><input type="text" value={app.state.outbox[idx].merit} onChange={(e) => handleChange(e, idx, 'merit')} /></td>
  </tr>
);

export default OutboxRow;
