import axios from 'axios';

const DEV_BASE = 'http://localhost:8080';
const PROD_BASE = 'https://joel-cookbook-server.herokuapp.com';

const get = path => {
  const url = process.env.REACT_APP_ENV === 'DEV' ? DEV_BASE : PROD_BASE;
  return axios.get(`${url}/${path}`);
};

const post = (path, data) => {
  const url = process.env.REACT_APP_ENV === 'DEV' ? DEV_BASE : PROD_BASE;
  return axios.post(`${url}/${path}`, data);
};

export { get, post };
