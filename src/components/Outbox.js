import React from 'react';
import OutboxRow from './OutboxRow';

const populateTable = (state, handleChange, handleCheck, hasError) => (
  state.outbox.map((item, key) => (
    <OutboxRow
      state={state}
      idx={key}
      handleChange={handleChange}
      handleCheck={handleCheck}
      hasError={hasError}
      key={key}
    />
    ))
);

const Outbox = ({state, handleChange, handleCheck, handleCheckAll, hasError}) => (
  <table>
    <thead>
      <tr>
        <th>
          <input type="checkbox" onChange={(e) => handleCheckAll(e)} />
        </th>
        <th>First</th>
        <th>Last</th>
        <th>Email</th>
        <th>Merit</th>
      </tr>
    </thead>
    <tbody>
    {populateTable(state, handleChange, handleCheck, hasError)}
    </tbody>
  </table>
);

export default Outbox;
