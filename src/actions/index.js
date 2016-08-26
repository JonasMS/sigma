import { updateDB } from '../modules/';

export const setAll = (
  app,
  outbox = [],
  checkboxes = [],
  merits = [],
  checked = [],
  inputErrors = {}
) => {
  app.setState({ outbox, checkboxes, merits, checked, inputErrors });
}

export const removeError = (app, idx) => {
  const inputErrors = Object.assign({}, app.state.inputErrors);
  delete inputErrors[idx];
  app.setState({ inputErrors });
}

export const updateOutbox = (app, outbox = [], merits = []) => {
  app.setState({ outbox });
  updateDB(outbox, merits);
}

export const updateCheckboxes = (app, checkboxes = [], checked = []) => {
  app.setState({ checkboxes, checked });
}

export const addOutboxEntry = (app, entry = {}) => {
  app.setState({ outbox: app.state.outbox.concat(entry) });
}
