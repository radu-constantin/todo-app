import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/todos';

let token = null;

function setToken(newToken) {
  token = `bearer ${newToken}`;
}

function getAll() {
  return axios.get(baseUrl);
}

async function create(newTodo) {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newTodo, config);
  return response.data;
};

function deleteTodo(todoID) {
  return axios.delete(`${baseUrl}/${todoID}`);
};

function checkTodo(todoID) {
  return axios.put(`${baseUrl}/${todoID}`, { done: true });
};

function uncheckTodo(todoID) {
  return axios.put(`${baseUrl}/${todoID}`, { done: false });
};

export default {
  getAll: getAll,
  create: create,
  deleteTodo: deleteTodo,
  checkTodo: checkTodo,
  uncheckTodo: uncheckTodo,
  setToken: setToken
}