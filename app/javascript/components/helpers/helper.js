import axios from "axios";

export function isEmptyStr(str) {
  return isBlank(str) || (typeof str === 'string' && str.trim() === '');
}

export function isBlank(obj) {
  return typeof obj === 'undefined' || obj === null || (typeof obj === 'object' && Object.keys(obj).length === 0);
}

export function isPresent(obj) {
  return typeof obj !== 'undefined' && obj !== null && !(typeof obj === 'object' && Object.keys(obj).length === 0);
}

export const createCsrfToken = () => {
  const csrfToken = document.querySelector('[name=csrf-token]').content
  axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
}