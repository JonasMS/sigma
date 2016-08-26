import React from 'react';
import OutboxCell from './OutboxCell';

const populateRow = (row, idx, merits, handleChange, hasError) => (
  Object.keys(row).map((prop, key) => (
    <OutboxCell
      value={row[prop]}
      idx={idx}
      prop={prop}
      merits={merits}
      handleChange={handleChange}
      hasError={hasError}
      key={key}
    />
  ))
);

const OutboxRow = ({state, idx, handleChange, handleCheck, hasError}) => (
  <tr>
    <td><input type="checkbox" checked={state.checkboxes[idx]} onChange={() => handleCheck(idx)} /></td>
    {populateRow(state.outbox[idx], idx, state.merits, handleChange, hasError)}
  </tr>
);

export default OutboxRow;
