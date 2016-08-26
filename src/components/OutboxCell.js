import React from 'react';

const OutboxCell = ({value, idx, prop, handleChange, hasError}) => (
  <td><input
    className={hasError(idx, prop) ? 'error' : ''}
    type="text"
    value={value}
    onChange={(e) => handleChange(e, idx, prop)}
  /></td>
);

export default OutboxCell;
