import React from 'react';
import MeritDropdown from './MeritDropdown';

const OutboxCell = ({value, idx, prop, merits, handleChange, hasError}) => (
  prop === 'merit' ?
    <td><MeritDropdown merits={merits} value={value} rowIdx={idx} prop={prop} handleChange={handleChange}/></td>
  :
  <td><input
    className={hasError(idx, prop) ? 'error' : ''}
    type="text"
    value={value}
    onChange={(e) => handleChange(e, idx, prop)}
  /></td>
);

export default OutboxCell;
