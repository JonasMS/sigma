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

export const removeError = (app, idx) => {
  const inputErrors = Object.assign({}, app.state.inputErrors);
  delete inputErrors[idx];
  app.setState({ inputErrors });
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
  app.setState({ outbox: app.state.outbox.concat(entry) });
}
