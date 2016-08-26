import React from 'react';
import DropdownOption from './DropdownOption';

const populateDropdown = (merits, rowIdx) => (
  merits.map((merit, key) => <DropdownOption merit={merit} rowIdx={rowIdx} key={key}/> )
);

const MeritDropdown = ({merits, value, rowIdx, handleChange}) => (
  <select value={value} onChange={e => handleChange(e, rowIdx, 'merit')}>
    {populateDropdown(merits, rowIdx)}
  </select>
);

export default MeritDropdown;
