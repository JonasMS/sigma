import { updateDB } from '../modules/';

export const setAll = (
  app,
  outbox = app.state.outbox,
  checkboxes = app.state.checkboxes,
  merits = app.state.merits,
  checked = app.state.checked,
  inputErrors = app.state.inputErrors,
) => {
  app.setState({ outbox, checkboxes, merits, checked, inputErrors });
}

export const removeErrors = (app, indexes) => {
  const inputErrors = Object.assign({}, app.state.inputErrors);

  if (Array.isArray(indexes)) {
    indexes.forEach(idx => delete inputErrors[idx]);
    app.setState({ inputErrors });
    return;
  }

  if (typeof indexes === 'number' && Number.isInteger(indexes)) {
    delete inputErrors[indexes];
    app.setState({ inputErrors });
    return;
  }
  throw new Error('indexes is not of type Array or an Integer of type Number');
}

export const setErrors = (app, inputErrors = app.state.inputErrors) => {
  app.setState({ inputErrors });
}

export const updateOutbox = (app, outbox = app.state.out, merits = app.state.merits) => {
  app.setState({ outbox });
  updateDB(outbox, merits);
}

export const updateCheckboxes = (app, checkboxes = app.state.checkboxes, checked = app.state.checked) => {
  app.setState({ checkboxes, checked });
}

export const addOutboxEntry = (app, entry = {}) => {
  const { outbox, checkboxes } = app.state;
  app.setState({ outbox: outbox.concat(entry), checkboxes: checkboxes.concat(false) });
}
