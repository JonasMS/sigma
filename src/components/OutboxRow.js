import React from 'react';
import OutboxCell from './OutboxCell';

const populateRow = (row, idx, handleChange, hasError) => (
  Object.keys(row).map((prop, key) => (
    <OutboxCell
      value={row[prop]}
      idx={idx}
      prop={prop}
      handleChange={handleChange}
      hasError={hasError}
      key={key}
    />
  ))
);

const OutboxRow = ({state, idx, handleChange, handleCheck, hasError}) => (
  <tr>
    <td><input type="checkbox" checked={state.checkboxes[idx]} onChange={(e) => handleCheck(e, idx)} /></td>
    {populateRow(state.outbox[idx], idx, handleChange, hasError)}
  </tr>
);

export default OutboxRow;
