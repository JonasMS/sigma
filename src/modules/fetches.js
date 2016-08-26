import fetch from 'isomorphic-fetch';
require('es6-promise').polyfill();
import { createPOST } from './fetchUtils';

export const updateDB = (outbox, merits) => (
  fetch('http://localhost:3000/outbox', createPOST({ outbox, merits }))
)
